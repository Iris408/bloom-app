"""add profile avatar choice

Revision ID: 7a3e9b1c2d40
Revises: cc9ff6f5b6b6
Create Date: 2026-10-16 19:05:00.000000

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7a3e9b1c2d40"
down_revision = "cc9ff6f5b6b6"
branch_labels = None
depends_on = None


def upgrade():
    columns = {
        column["name"]
        for column in sa.inspect(op.get_bind()).get_columns("profile_settings")
    }

    # EN: Existing rows get "initial" (letter avatar) through the server default.
    # JP: 既存の行にはサーバー既定値で "initial"（頭文字アバター）が入ります。
    with op.batch_alter_table("profile_settings") as batch_op:
        if "avatar_type" not in columns:
            batch_op.add_column(
                sa.Column("avatar_type", sa.String(), nullable=False, server_default="initial")
            )

        if "avatar_id" not in columns:
            batch_op.add_column(sa.Column("avatar_id", sa.String(), nullable=True))


def downgrade():
    with op.batch_alter_table("profile_settings") as batch_op:
        batch_op.drop_column("avatar_id")
        batch_op.drop_column("avatar_type")
