from datetime import datetime
from app.repositories import submissionRepository
from app.schemas import submissionSchema
from fastapi import HTTPException, status
import logging as log



async def create_submission(submission: submissionSchema.SubmissionCreate, db, user_id, competition_id: int):

    metaData = {
        "competition_id": competition_id,
        "competitor_id": user_id,
        "submitted_at": datetime.utcnow()
    }

    return await submissionRepository.create_submission(submission=submission, db=db, metaData=metaData)

async def get_submissions(db, competition_id: int) -> list[submissionSchema.SubmissionRead]:
    submissions = await submissionRepository.get_submissions(db=db, competition_id=competition_id)
    return submissions


