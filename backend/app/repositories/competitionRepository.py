from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models import competitionModel, userModel
from app.schemas import competitionSchema, userSchema

async def insert_competition(db, competition: competitionSchema.CompetitionCreate, user_id:int):
    db_competition = competitionModel.Competition(title = competition.title, finished_at = competition.finished_at, created_by = user_id)
    db.add(db_competition)
    await db.commit()
    await db.refresh(db_competition)
    return db_competition

async def get_competition(db, title: str = None, id: int = None):
    if id is not None:
        result = await db.execute(select(competitionModel.Competition).where(competitionModel.Competition.id==id))
    else:
        result = await db.execute(select(competitionModel.Competition).where(competitionModel.Competition.title==title))
    return result.scalar_one_or_none()

