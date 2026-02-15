from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func, select
from app.models.submissionsModel import Submission

async def create_submission(db, content: str, user_id: int, competition_id: int):
    db_submission = Submission(
        content=content,
        competition_id=competition_id,
        competitor_id=user_id,
    )
    db.add(db_submission)
    await db.commit()
    await db.refresh(db_submission)
    return db_submission


async def get_by_id(db: AsyncSession, submission_id):
    result = await db.execute(select(Submission).where(Submission.id==submission_id))
    return result.scalar_one_or_none()

async def get_submission_by_userId(db: AsyncSession, user_id):
    result = await db.execute(select(Submission).where(Submission.competitor_id==user_id))
    return result.scalars()

async def get_by_competitionId(db: AsyncSession, competition_id):
    result = await db.execute(select(Submission).where(Submission.competitor_id==competition_id))
    return result.scalars()

async def get_by_userId_competitionId(db:AsyncSession, user_id:int, competition_id:int):
    result = await db.execute(select(Submission).filters(Submission.competitor_id==user_id, Submission.competitition_id==competition_id))
    return result.scalar_one_or_none()

async def update_submission(db: AsyncSession, score: int, feedback: str, submission_id):
    sub = await get_by_id(db, submission_id)
    if sub:
        sub.sub.score = score
        sub.feedback = feedback
        sub.status = "evaluated"
        sub.evaluated_at = func.now()
        await db.commit()
        await db.refresh(sub)
    return sub


