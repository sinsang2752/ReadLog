# ReadLog 디렉토리 구조

모듈(auth / reading-plan / reading-group) 경계를 디렉토리 경계와 일치시켜, 기능별로 관심사를 분리했다. 상세 규칙은 루트 `CLAUDE.md` §3, §5 참고.

```
readlog/
├── CLAUDE.md                              # 전역 규칙 (필독)
│
├── .claude/
│   └── skills/                            # Claude Code 모듈별 스킬
│       ├── auth-module/SKILL.md
│       ├── reading-plan-module/SKILL.md
│       ├── reading-group-module/SKILL.md
│       └── _shared/SKILL.md               # 공용 컨벤션
│
├── docs/
│   ├── requirements_and_flowchart.md      # 전체 화면 요구사항 원본
│   ├── mainpage_and_reading_progress_spec.md  # 메인홈/진도입력 추가 스펙
│   ├── DIRECTORY_STRUCTURE.md             # 이 문서
│   ├── figma-export/
│   │   └── App.tsx                        # Figma 화면설계서 뷰어 (참고용, RN 코드 아님)
│   ├── db/
│   │   └── schema.sql                     # ReadLog Schema V2 (확정 반영됨)
│   └── api-contracts/
│       ├── auth.md
│       ├── reading-plan.md
│       └── reading-group.md
│
├── frontend/                              # React Native (TypeScript)
│   ├── src/
│   │   ├── app/                           # 앱 엔트리 포인트
│   │   ├── navigation/                    # [공용] 스택/탭 네비게이터
│   │   ├── screens/
│   │   │   ├── auth/                      # 로그인/회원가입/마이페이지 등
│   │   │   ├── reading-plan/              # 책검색/서재/진도입력/SNS공유
│   │   │   ├── reading-group/             # 모임 목록/개설/홈/댓글 등
│   │   │   └── home/                      # [공용] 메인 홈 대시보드
│   │   ├── components/
│   │   │   ├── auth/  reading-plan/  reading-group/   # 모듈별 전용 컴포넌트
│   │   │   └── common/                    # [공용] NavBar, TabBar, Button, Field
│   │   ├── store/
│   │   │   ├── auth/  reading-plan/  reading-group/   # 모듈별 상태관리
│   │   ├── api/
│   │   │   ├── auth/  reading-plan/  reading-group/   # 모듈별 API 함수
│   │   │   └── client/                    # [공용] axios 인스턴스, 인터셉터
│   │   ├── types/
│   │   │   ├── auth/  reading-plan/  reading-group/
│   │   │   └── common/                    # [공용] 모듈 간 공유 타입
│   │   ├── hooks/
│   │   │   └── auth/  reading-plan/  reading-group/
│   │   ├── constants/                     # [공용] 디자인 토큰, 상수
│   │   └── utils/                         # [공용] 범용 유틸
│   ├── assets/{images,fonts}/
│   └── __tests__/{auth,reading-plan,reading-group}/
│
├── backend/                                # FastAPI (Python)
│   ├── app/
│   │   ├── core/                          # [공용] config, Redis client, 인증 의존성
│   │   ├── db/                            # [공용] SQLAlchemy 엔진/세션/Base
│   │   ├── common/{deps,exceptions,middlewares}/  # [공용]
│   │   ├── modules/
│   │   │   ├── auth/{routers,schemas,services,models}/
│   │   │   ├── reading_plan/{routers,schemas,services,models}/
│   │   │   └── reading_group/{routers,schemas,services,models}/
│   │   └── migrations/versions/           # Alembic 마이그레이션
│   └── tests/{auth,reading_plan,reading_group}/
│
└── .github/workflows/                      # CI (lint/test)
```

## 범례
- 모듈 디렉토리(`auth`/`reading-plan`/`reading-group`) — 각 기능이 자기 디렉토리 안에서만 완결되도록 구성
- `[공용]` — 여러 모듈이 함께 쓰는 영역, 수정 시 다른 모듈에 영향이 없는지 먼저 확인 (CLAUDE.md §5)
