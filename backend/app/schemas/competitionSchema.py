from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

# class StatusEnum(str, Enum):
#     active = "active"
#     completed = "completed"

class CompetitionBase(BaseModel):
    title: str
    description: Optional[str] = None
    evaluation_criteria: Optional[str] = None
    is_active: bool = True


# class CompetitionUpdateStatus(BaseModel):
#     status: StatusEnum
class CompetitionCreate(CompetitionBase):
    pass   

class CompetitionRead(CompetitionBase):
    id: int
    created_at: datetime
    created_by: int
    class Config:
        from_attributes = True
