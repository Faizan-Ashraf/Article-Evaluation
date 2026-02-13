from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import competitionSchema
from app.service import competitionService
from app.dependencies.dependencies import get_db
from app.core.auth import verify_token

router = APIRouter(prefix="/competitions", tags=["competitions"])

@router.post("/", response_model=competitionSchema.CompetitionRead, status_code=status.HTTP_201_CREATED)
async def create_competition(competition: competitionSchema.CompetitionCreate,
                            db: AsyncSession = Depends(get_db),
                            user = Depends(verify_token)):
    
    if user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only admins can create competitions")
    
    return await competitionService.create_competition(competition=competition,
                                                        db=db, user_id=int(user.get("id")))



   



