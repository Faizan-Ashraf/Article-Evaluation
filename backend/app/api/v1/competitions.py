from fastapi import APIRouter, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import userSchema, competitionSchema
from app.service import competitionService
from app.dependencies.dependencies import get_db

router = APIRouter(prefix='/', tags=['Home'])

@router.get("/all-competitions", response_model=list[competitionSchema.CompetitionRead], status_code=status.HTTP_200_OK)
async def get_all_competitions(db: AsyncSession = Depends(get_db)):
    return await competitionService.competitions(db)


@router.get("/competition/{id}", response_model=competitionSchema.CompetitionRead, status_code=status.HTTP_201_CREATED)
async def get_competition(id : int, db: AsyncSession = Depends(get_db)):
    
    return await competitionService.competition_by_id(db=db, id=id)
