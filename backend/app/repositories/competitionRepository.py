from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.competitionModel import Competition


async def create(db: AsyncSession, meta_data: dict):
    db_competition = Competition(
        title= meta_data.get("title"),
        description=meta_data.get("description"),
        evaluation_criteria = meta_data.get("evaluation_criteria"),
        created_by = meta_data.get("created_by"),
        is_active = meta_data.get("is_active")
    )
    db.add(db_competition)
    await db.commit()
    await db.refresh(db_competition) 
    return db_competition
    

async def get_competitions(db: AsyncSession, skip: int = 0, limit: int = 10):
    result = await db.execute(select(Competition).offset(skip).limit(limit))
    return result.scalars().all()

async def get_active_competitions(db: AsyncSession):
    result = await db.execute(select(Competition).where(Competition.is_active==True))
    return result.scalars().all()

async def get_by_id(db: AsyncSession, competition_id: int):
    result = await db.execute(select(Competition).where(Competition.id==competition_id))
    return result.scalar_one_or_none()

