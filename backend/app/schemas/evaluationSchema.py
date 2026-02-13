from pydantic import BaseModel
class EvaluationCreate(BaseModel):
    score: float
    feedback: str
    submission_id: int
    competition_id: int

class EvaluationRead(BaseModel):
    id: int
    score: float
    feedback: str
    submission_id: int
    competition_id: int

    class Config:
        from_attributes = True

class EvaluationUpdate(BaseModel):
    score: float
    feedback: str

