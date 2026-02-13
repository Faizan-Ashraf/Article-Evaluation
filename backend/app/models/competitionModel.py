from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime



class Competition(Base):
    __tablename__="competitions"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    finished_at = Column(DateTime, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"))
    admin = relationship("User", back_populates="competitions")
    
    submissions = relationship("Submission", back_populates="competition", cascade="all, delete")
    rankings = relationship("Ranking", back_populates="competition", cascade="all, delete")
