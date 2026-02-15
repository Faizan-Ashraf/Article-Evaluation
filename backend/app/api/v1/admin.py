from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import userSchema, competitionSchema
from app.core.auth import verify_token
from app.service import competitionService


from app.dependencies.dependencies import get_db

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/competition", response_model=competitionSchema.CompetitionRead, status_code=status.HTTP_201_CREATED)
async def create_competition(competition: competitionSchema.CompetitionCreate, db: AsyncSession = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to perform this action!")
    
    return await competitionService.create_competition(db=db, competition=competition, user_id=int(payload.get("user_id")))




