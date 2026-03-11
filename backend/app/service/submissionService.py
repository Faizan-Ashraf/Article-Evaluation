from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories import submissionRepository, competitionRepository
from app.schemas import submissionSchema
from fastapi import HTTPException, status

async def submit_article(db: AsyncSession, submission: submissionSchema.SubmissionCreate, user_id: int):
    db_competition = await competitionRepository.get_by_id(db, competition_id=submission.competition_id)
    if not db_competition or not db_competition.is_active:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Competition is inactive or not found!")
    
    data = await submissionRepository.get_by_userId_competitionId(db, user_id, submission.competition_id)
    if data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You already submitted the article!")
    
    return await submissionRepository.create_submission(db, submission.content, user_id, submission.competition_id)


async def get_user_submissions(db, user_id: int):
    db_submissions = await submissionRepository.get_submission_by_userId(db, user_id)
    if not db_submissions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="You Did not submit any article yet!")

    return db_submissions


async def get_submissions_for_competition(db, competition_id):
    db_submissions = await submissionRepository.get_by_competitionId(db, competition_id)
    if len(db_submissions) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No submissions found yet!")

    return db_submissions
    



