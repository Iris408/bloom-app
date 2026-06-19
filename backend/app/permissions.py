# EN: Reusable permission checks for protected Bloom routes.
# JP: 保護されたBloomルート用の再利用可能な権限チェックです。

from fastapi import HTTPException, status


FORBIDDEN_RESOURCE_MESSAGE = "You do not have permission to access this resource."


def ensure_user_owns_resource(resource_user_id: int, current_user_id: int):
    # EN: Stop users from accessing or changing another user's data.
    # JP: 他のユーザーのデータにアクセス・変更できないようにします。
    if resource_user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=FORBIDDEN_RESOURCE_MESSAGE,
        )