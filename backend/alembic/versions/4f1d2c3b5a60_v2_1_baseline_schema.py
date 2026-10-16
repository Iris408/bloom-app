"""v2.1 baseline schema

Creates the tables that existed before Alembic was introduced (they were
originally created by Base.metadata.create_all). Each table is created only
if it is missing, so databases that were built by create_all can be upgraded
without errors, and an empty database can be built entirely from migrations.

Revision ID: 4f1d2c3b5a60
Revises:
Create Date: 2026-10-16 19:00:00.000000

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "4f1d2c3b5a60"
down_revision = None
branch_labels = None
depends_on = None


def table_exists(name):
    return sa.inspect(op.get_bind()).has_table(name)


def upgrade():
    if not table_exists("users"):
        op.create_table(
            "users",
            sa.Column("id", sa.Integer(), nullable=False),
            sa.Column("email", sa.String(), nullable=False),
            sa.Column("username", sa.String(), nullable=False),
            sa.Column("hashed_password", sa.String(), nullable=False),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index("ix_users_id", "users", ["id"])
        op.create_index("ix_users_email", "users", ["email"], unique=True)
        op.create_index("ix_users_username", "users", ["username"], unique=True)

    if not table_exists("profile_settings"):
        op.create_table(
            "profile_settings",
            sa.Column("id", sa.Integer(), nullable=False),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
            sa.Column("display_name", sa.String(), nullable=True),
            sa.Column("theme", sa.String(), nullable=True),
            sa.Column("text_size", sa.String(), nullable=True),
            sa.Column("dyslexic_font", sa.Boolean(), nullable=True),
            sa.Column("reduce_motion", sa.Boolean(), nullable=True),
            sa.PrimaryKeyConstraint("id"),
            sa.UniqueConstraint("user_id"),
        )
        op.create_index("ix_profile_settings_id", "profile_settings", ["id"])

    # EN: tasks.emoji is added by the next migration (cc9ff6f5b6b6).
    # JP: tasks.emoji は次のマイグレーション（cc9ff6f5b6b6）で追加されます。
    if not table_exists("tasks"):
        op.create_table(
            "tasks",
            sa.Column("id", sa.Integer(), nullable=False),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
            sa.Column("title", sa.String(), nullable=False),
            sa.Column("completed", sa.Boolean(), nullable=True),
            sa.Column("created_at", sa.DateTime(), nullable=True),
            sa.Column("updated_at", sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index("ix_tasks_id", "tasks", ["id"])

    if not table_exists("routines"):
        op.create_table(
            "routines",
            sa.Column("id", sa.Integer(), nullable=False),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
            sa.Column("name", sa.String(), nullable=False),
            sa.Column("completed", sa.Boolean(), nullable=True),
            sa.Column("created_at", sa.DateTime(), nullable=True),
            sa.Column("updated_at", sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index("ix_routines_id", "routines", ["id"])

    if not table_exists("routine_steps"):
        op.create_table(
            "routine_steps",
            sa.Column("id", sa.Integer(), nullable=False),
            sa.Column("routine_id", sa.Integer(), sa.ForeignKey("routines.id"), nullable=False),
            sa.Column("title", sa.String(), nullable=False),
            sa.Column("completed", sa.Boolean(), nullable=True),
            sa.Column("step_order", sa.Integer(), nullable=True),
            sa.Column("created_at", sa.DateTime(), nullable=True),
            sa.Column("updated_at", sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index("ix_routine_steps_id", "routine_steps", ["id"])

    if not table_exists("focus_tasks"):
        op.create_table(
            "focus_tasks",
            sa.Column("id", sa.Integer(), nullable=False),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
            sa.Column("title", sa.String(), nullable=False),
            sa.Column("completed", sa.Boolean(), nullable=True),
            sa.Column("created_at", sa.DateTime(), nullable=True),
            sa.Column("updated_at", sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index("ix_focus_tasks_id", "focus_tasks", ["id"])

    if not table_exists("progress_snapshots"):
        op.create_table(
            "progress_snapshots",
            sa.Column("id", sa.Integer(), nullable=False),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
            sa.Column("snapshot_date", sa.String(), nullable=False),
            sa.Column("completed_tasks", sa.Integer(), nullable=True),
            sa.Column("total_tasks", sa.Integer(), nullable=True),
            sa.Column("completed_routines", sa.Integer(), nullable=True),
            sa.Column("total_routines", sa.Integer(), nullable=True),
            sa.Column("completed_focus_tasks", sa.Integer(), nullable=True),
            sa.Column("total_focus_tasks", sa.Integer(), nullable=True),
            sa.Column("created_at", sa.DateTime(), nullable=True),
            sa.Column("updated_at", sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index("ix_progress_snapshots_id", "progress_snapshots", ["id"])


def downgrade():
    # EN: Removes the whole v2.1 schema (and its data). Only for empty/test databases.
    # JP: v2.1 スキーマ全体（データを含む）を削除します。空またはテスト用DB専用です。
    for table in (
        "progress_snapshots",
        "focus_tasks",
        "routine_steps",
        "routines",
        "tasks",
        "profile_settings",
        "users",
    ):
        op.drop_table(table)
