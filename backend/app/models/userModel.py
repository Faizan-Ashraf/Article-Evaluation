from app.core.database import Base
from sqlalchemy import Column, Integer, String, Enum as SQLEnum
from enum import Enum


class Role(Enum):
    ADMIN = "ADMIN"
    COMPETITOR = "COMPETITOR"


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String)
    password = Column(String)
    role = Column(SQLEnum(Role, name="role"), nullable=False, default=Role.COMPETITOR)