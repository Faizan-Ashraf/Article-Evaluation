from pydantic import BaseModel
from datetime import datetime
from enum import Enum

# class StatusEnum(str, Enum):
#     active = "active"
#     completed = "completed"

class CompetitionCreate(BaseModel):
    title: str
    finished_at: datetime

# class CompetitionUpdateStatus(BaseModel):
#     status: StatusEnum

class CompetitionRead(BaseModel):
    id: int
    title: str
    finished_at: datetime
    created_by: int
    
    class Config:
        from_attributes = True