from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SubmissionBase(BaseModel):
    content: str
    competition_id: int

class SubmissionCreate(SubmissionBase):
    pass

class SubmissionRead(SubmissionBase):
    id: int
    submitted_at: datetime
    competition_id: int
    feedback: Optional[str] = None
    score: Optional[int] = None
    evaluated_at: Optional[datetime] = None
    status: str

    class Config:
        from_attributes = True
    