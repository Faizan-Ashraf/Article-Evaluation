from app.repositories import competitionRepository
from app.schemas import competitionSchema
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException


async def create_competition(db: AsyncSession, competition: competitionSchema.CompetitionCreate, user_id: int):

    meta_data: dict = {
        "title": competition.title, 
        "description": competition.description,
        "evaluation_criteria": competition.evaluation_criteria,
        "is_active" : competition.is_active,
        "created_by": user_id
    }
    return await competitionRepository.create(db, meta_data=meta_data)


async def active_competitions(db: AsyncSession):
    db_competitions = await competitionRepository.get_active_competitions(db=db)
    if db_competitions:
        return db_competitions
    
    raise HTTPException(detail="There is No Active Competions!")

async def competition_by_id(db: AsyncSession, competition_id: int):
    db_competitions = await competitionRepository.get_by_id(db=db, competition_id=competition_id)
    if db_competitions:
        return db_competitions
    
    raise HTTPException(detail=f"No competition found with this id:{competition_id}")