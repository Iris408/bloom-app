"""add emoji to tasks

Revision ID: cc9ff6f5b6b6
Revises: 
Create Date: 2026-07-11 20:56:37.912026

"""

from alembic import op
import sqlalchemy as sa



# revision identifiers, used by Alembic.
revision = 'cc9ff6f5b6b6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "tasks",
        sa.Column("emoji", sa.String(), nullable=False, server_default="🌱"),
    )

    op.alter_column("tasks", "emoji", server_default=None)


def downgrade():
    op.drop_column("tasks", "emoji")