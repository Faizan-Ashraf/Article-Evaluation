from app.repositories import competitionRepository
from app.repositories import userRepository
from app.schemas import competitionSchema
from app.core import auth
from fastapi import HTTPException, status
import logging as log
from datetime import datetime


async def create_competition(competition: competitionSchema.CompetitionCreate, db, user_id):

    if competition.finished_at <= datetime.utcnow():
        log.error("Evaluation finish time must be in the future")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Evaluation finish time must be in the future")
    
    db_competition = await competitionRepository.insert_competition(db=db,
                                                                    competition=competition,
                                                                    user_id=user_id)
    
    return db_competition
