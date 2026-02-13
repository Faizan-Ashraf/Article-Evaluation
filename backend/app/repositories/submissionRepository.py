from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models import submissionsModel
from app.schemas import submissionSchema

async def create_submission(submission: submissionSchema.SubmissionCreate, db: AsyncSession, metaData: dict):
    db_submission = submissionsModel.Submission(
        content=submission.content,
        competition_id=metaData["competition_id"],
        competitor_id=metaData["competitor_id"],
        submitted_at=metaData["submitted_at"]
    )
    db.add(db_submission)
    await db.commit()
    await db.refresh(db_submission)
    return db_submission

async def get_submissions(db: AsyncSession, competition_id: int) -> list[submissionSchema.SubmissionRead]:
    result = await db.execute(
        select(submissionsModel.Submission).where(submissionsModel.Submission.competition_id == competition_id)
    )
    submissions = result.scalars().all()
    return submissions
