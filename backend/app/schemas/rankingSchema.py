from pydantic import BaseModel

class RankingCreate(BaseModel):
    rank: int
    submission_id: int
    competition_id: int

class RankingRead(BaseModel):
    id: int
    rank: int
    submission_id: int
    competition_id: int

    class Config:
        from_attributes = True

class RankingUpdate(BaseModel):
    submission_id: int
    rank: int
