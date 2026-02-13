from pydantic import BaseModel
from datetime import datetime

class SubmissionCreate(BaseModel):
    content: str

class SubmissionRead(SubmissionCreate):
    content: str
    submitted_at: datetime
    competitor_id: int
    competition_id: int
    class Config:
        from_attributes = True

class SubmissionWithRanking(SubmissionRead): 
    rankings: list

class SubmissionWithCompetitor(SubmissionRead):
    competitor: dict
    