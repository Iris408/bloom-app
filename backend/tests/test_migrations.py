# EN: Alembic migration checks. Each test uses its own empty database
# (a temporary SQLite file, or MIGRATION_TEST_DATABASE_URL for PostgreSQL).
# JP: Alembic マイグレーションのテストです。各テストは専用の空のDBを使います。

import os
import uuid
from pathlib import Path

import pytest
import sqlalchemy as sa
from alembic import command
from alembic.autogenerate import compare_metadata
from alembic.config import Config
from alembic.migration import MigrationContext

from app import models
from app.database import Base

BACKEND_DIR = Path(__file__).resolve().parents[1]
HEAD = "9c4b6d8e1f20"
LEGACY_EMOJI_REVISION = "cc9ff6f5b6b6"


@pytest.fixture
def migration_db(tmp_path, monkeypatch):
    url = os.environ.get("MIGRATION_TEST_DATABASE_URL") or f"sqlite:///{tmp_path / f'{uuid.uuid4().hex}.db'}"
    engine = sa.create_engine(url)

    def reset():
        with engine.begin() as connection:
            Base.metadata.drop_all(connection)
            connection.execute(sa.text("DROP TABLE IF EXISTS alembic_version"))

    reset()

    # EN: alembic/env.py reads DATABASE_URL, so point it at this test database.
    # JP: alembic/env.py は DATABASE_URL を読むため、このテスト用DBを指定します。
    monkeypatch.setenv("DATABASE_URL", url)

    config = Config(str(BACKEND_DIR / "alembic.ini"))
    config.set_main_option("script_location", str(BACKEND_DIR / "alembic"))

    yield engine, config

    reset()
    engine.dispose()


def current_revision(engine):
    with engine.connect() as connection:
        return MigrationContext.configure(connection).get_current_revision()


def schema_differences(engine):
    with engine.connect() as connection:
        return compare_metadata(MigrationContext.configure(connection), Base.metadata)


def test_empty_database_upgrades_to_models(migration_db):
    engine, config = migration_db

    command.upgrade(config, "head")

    assert current_revision(engine) == HEAD
    assert schema_differences(engine) == []


def test_downgrade_to_base_and_upgrade_again(migration_db):
    engine, config = migration_db

    command.upgrade(config, "head")
    command.downgrade(config, "base")
    assert set(sa.inspect(engine).get_table_names()) <= {"alembic_version"}

    command.upgrade(config, "head")
    assert schema_differences(engine) == []


def test_database_stamped_at_legacy_revision_upgrades_with_data(migration_db):
    # EN: Mirrors existing databases: v2.1 tables plus the emoji migration.
    # JP: 既存DBの状態（v2.1テーブル＋emojiマイグレーション）を再現します。
    engine, config = migration_db
    command.upgrade(config, LEGACY_EMOJI_REVISION)

    with engine.begin() as connection:
        connection.execute(sa.text(
            "INSERT INTO users (id, email, username, hashed_password) VALUES (1, 'a@b.dev', 'alice', 'x')"
        ))
        connection.execute(sa.text(
            "INSERT INTO profile_settings (id, user_id, display_name, theme, text_size, dyslexic_font, reduce_motion) "
            "VALUES (1, 1, 'alice', 'dark', 'xl', true, false)"
        ))
        connection.execute(sa.text(
            "INSERT INTO tasks (id, user_id, title, completed, emoji) VALUES (1, 1, 'Water plants', false, '🌿')"
        ))

    command.upgrade(config, "head")

    assert current_revision(engine) == HEAD
    assert schema_differences(engine) == []

    with engine.connect() as connection:
        profile = connection.execute(sa.text(
            "SELECT theme, text_size, dyslexic_font, avatar_type, avatar_id FROM profile_settings"
        )).one()
        task = connection.execute(sa.text("SELECT title, emoji FROM tasks")).one()

    assert (profile.theme, profile.text_size, bool(profile.dyslexic_font)) == ("dark", "xl", True)
    assert (profile.avatar_type, profile.avatar_id) == ("initial", None)
    assert tuple(task) == ("Water plants", "🌿")


def test_unstamped_v21_create_all_database_upgrades(migration_db):
    # EN: A database built by create_all from the v2.1 models (with emoji,
    # without avatar columns or moments) and never stamped by Alembic.
    # JP: v2.1 モデルから create_all で作成され、Alembic で未スタンプのDBです。
    engine, config = migration_db
    v21_tables = [
        table for name, table in Base.metadata.tables.items() if name != "moments"
    ]

    with engine.begin() as connection:
        Base.metadata.create_all(connection, tables=v21_tables)

    with engine.begin() as connection:
        connection.execute(sa.text("ALTER TABLE profile_settings DROP COLUMN avatar_id"))
        connection.execute(sa.text("ALTER TABLE profile_settings DROP COLUMN avatar_type"))

    command.upgrade(config, "head")

    assert current_revision(engine) == HEAD
    assert schema_differences(engine) == []


def test_unstamped_current_create_all_database_upgrades(migration_db):
    # EN: create_all at startup may already have built the full schema.
    # JP: 起動時の create_all で既に全スキーマが作られている場合です。
    engine, config = migration_db

    with engine.begin() as connection:
        Base.metadata.create_all(connection)

    command.upgrade(config, "head")

    assert current_revision(engine) == HEAD
    assert schema_differences(engine) == []


def test_every_model_table_is_covered_by_migrations(migration_db):
    engine, config = migration_db

    command.upgrade(config, "head")

    tables = set(sa.inspect(engine).get_table_names()) - {"alembic_version"}
    assert tables == set(models.Base.metadata.tables)
