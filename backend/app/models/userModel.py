from app.core.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .competitionModel import Competition



class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String)
    password = Column(String)
    role = Column(String, nullable=False)
    competitions = relationship("Competition", back_populates="admin")

    submissions = relationship("Submission", back_populates="competitor")



