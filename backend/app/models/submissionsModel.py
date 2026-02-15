from app.core.database import Base
from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from enum import Enum

class Status(Enum):
    PENDING = "pending"
    EVALUATED = "evaluated"


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, index=True, nullable=False)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    competitor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    competitition_id = Column(Integer, ForeignKey("competitions.id"), nullable=False)
    feedback = Column(Text)
    score = Column(Integer)
    evaluated_at = Column(DateTime(timezone=True))
    status = Column(SQLEnum(Status, name="status"), default=Status.PENDING)

    competitor = relationship("User")
    competition = relationship("Competition")
    