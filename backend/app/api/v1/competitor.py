from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import userSchema, competitionSchema, submissionSchema
from app.core.auth import verify_token
from app.service import competitionService, submissionService, evaluationService
from app.dependencies.dependencies import get_db

router = APIRouter(prefix="/competitor", tags=["Competitor"])

@router.get("/competitions", response_model=list[competitionSchema.CompetitionRead], status_code=status.HTTP_200_OK)
async def get_competitions(db: AsyncSession = Depends(get_db), payload: dict = Depends(verify_token)):
    return await competitionService.active_competitions(db=db)


@router.post("/submit-article", response_model=submissionSchema.SubmissionRead, status_code=status.HTTP_201_CREATED)
async def submit_article(article: submissionSchema.SubmissionCreate,db: AsyncSession = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") !="COMPETITOR":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to perform this action!")
    return await submissionService.submit_article(db, article, user_id=int(payload.get("user_id")))


@router.get("/my-results", response_model=list[submissionSchema.SubmissionRead], status_code=status.HTTP_200_OK)
async def get_results(db: AsyncSession = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") !="COMPETITOR":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to perform this action!")
    return await submissionService.get_user_submissions(db, user_id=int(payload.get("user_id")))