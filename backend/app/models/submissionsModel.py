from app.core.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship


class Submission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, index=True, nullable=False)

    submitted_at = Column(DateTime, nullable=False)

    competitor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    competitor = relationship("User", back_populates="submissions", uselist=False)

    rankings = relationship("Ranking", back_populates="submission", cascade="all, delete")
    
    evaluations = relationship("Evaluation", back_populates="submission", cascade="all, delete")

    competition_id = Column(Integer, ForeignKey("competitions.id"), nullable=False)
    competition = relationship("Competition", back_populates="submissions") 
    