from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
class Ranking(Base):
    __tablename__ = "rankings"
    id = Column(Integer, primary_key=True, index=True)
    
    competition_id = Column(Integer, ForeignKey("competitions.id"), nullable=False)
    competition = relationship("Competition", back_populates="rankings")

    submission_id = Column(Integer, ForeignKey("submissions.id"), nullable=False)
    submission = relationship("Submission", back_populates="rankings", uselist=False)

    

    rank = Column(Integer, nullable=False)