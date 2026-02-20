from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import userSchema, competitionSchema, submissionSchema
from app.core.auth import verify_token
from app.service import competitionService, submissionService, evaluationService


from app.dependencies.dependencies import get_db

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/competition", response_model=competitionSchema.CompetitionRead, status_code=status.HTTP_201_CREATED)
async def create_competition(competition: competitionSchema.CompetitionCreate, db: AsyncSession = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") != "ADMIN":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to perform this action!")
    
    return await competitionService.create_competition(db=db, competition=competition, user_id=int(payload.get("user_id")))


@router.get("/competitions/{id}/submissions", response_model=list[competitionSchema.CompetitionRead], status_code=status.HTTP_200_OK)
async def get_submissions(id: int, db: AsyncSession = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") != "ADMIN":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to perform this action!")
    
    return await submissionService.get_submissions_for_competition(db, id)


@router.get("/evaluate/{id}/competition", response_model= list[submissionSchema.SubmissionRead], status_code=status.HTTP_200_OK)
async def evaluate_submissions(id: int, db: AsyncSession = Depends(get_db), payload: dict = Depends(verify_token)):
    
    if payload.get("role") != "ADMIN":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to perform this action!")
    
    return await evaluationService.evaluate_submissions(db, id)

