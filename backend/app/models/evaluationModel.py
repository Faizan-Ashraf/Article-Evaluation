from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class Evaluation(Base):
    __tablename__ = "evaluations"
    id = Column(Integer, primary_key=True, index=True)
    score = Column(Integer, nullable=False)
    feedback = Column(Text, nullable=True)

    evaluated_at = Column(DateTime, nullable=False)

    submission_id = Column(Integer, ForeignKey("submissions.id"), nullable=False)
    submission = relationship("Submission", back_populates="evaluations", uselist=False)
    
    