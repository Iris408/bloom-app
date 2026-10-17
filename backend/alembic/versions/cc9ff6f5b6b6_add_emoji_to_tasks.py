"""add emoji to tasks

Revision ID: cc9ff6f5b6b6
Revises: 4f1d2c3b5a60
Create Date: 2026-07-11 20:56:37.912026

"""

from alembic import op
import sqlalchemy as sa



# revision identifiers, used by Alembic.
revision = 'cc9ff6f5b6b6'
# EN: Originally the first migration (down_revision = None). It now follows the
# v2.1 baseline so an empty database can be built from migrations. Databases
# already stamped at this revision are unaffected.
# JP: 元は最初のマイグレーションでしたが、空のDBを構築できるようベースラインの後に置きました。
down_revision = '4f1d2c3b5a60'
branch_labels = None
depends_on = None


def upgrade():
    # EN: Databases created by create_all after emoji was added already have it.
    # JP: emoji 追加後に create_all で作成されたDBには既に存在します。
    columns = {column["name"] for column in sa.inspect(op.get_bind()).get_columns("tasks")}

    if "emoji" in columns:
        return

    op.add_column(
        "tasks",
        sa.Column("emoji", sa.String(), nullable=False, server_default="🌱"),
    )

    # EN: batch mode lets SQLite (which cannot ALTER COLUMN) drop the default too.
    # JP: SQLite は ALTER COLUMN できないため、batch モードで既定値を外します。
    with op.batch_alter_table("tasks") as batch_op:
        batch_op.alter_column("emoji", server_default=None)


def downgrade():
    op.drop_column("tasks", "emoji")
