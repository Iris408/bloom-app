"""create moments

Revision ID: 9c4b6d8e1f20
Revises: 7a3e9b1c2d40
Create Date: 2026-10-16 19:10:00.000000

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "9c4b6d8e1f20"
down_revision = "7a3e9b1c2d40"
branch_labels = None
depends_on = None


def upgrade():
    if sa.inspect(op.get_bind()).has_table("moments"):
        return

    op.create_table(
        "moments",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("title", sa.String(length=120), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("tag", sa.String(length=32), nullable=False),
        sa.Column("image", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_moments_id", "moments", ["id"])
    op.create_index("ix_moments_user_id", "moments", ["user_id"])


def downgrade():
    op.drop_index("ix_moments_user_id", table_name="moments")
    op.drop_index("ix_moments_id", table_name="moments")
    op.drop_table("moments")
