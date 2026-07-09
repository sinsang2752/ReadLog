# 모델 관계(relationship)가 문자열로 다른 모듈의 클래스를 참조하는 경우가 있어서,
# 테스트가 일부 모듈만 import하면 SQLAlchemy가 매퍼 구성 시 그 클래스를 못 찾아
# InvalidRequestError가 난다. main.py와 동일하게 전체 모델을 미리 등록해둔다.
import app.modules.auth.models.user  # noqa: F401
import app.modules.reading_plan.models.book  # noqa: F401
import app.modules.reading_plan.models.user_library  # noqa: F401
import app.modules.reading_plan.models.reading_progress_log  # noqa: F401
import app.modules.reading_plan.models.review  # noqa: F401
import app.modules.reading_plan.models.sns_post  # noqa: F401
import app.modules.reading_plan.models.sns_sticker  # noqa: F401
import app.modules.reading_plan.models.reading_goal  # noqa: F401
import app.modules.reading_group.models.group  # noqa: F401
