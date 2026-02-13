from pydantic import EmailStr, BaseModel, Field
from enum import Enum


class Role(str, Enum):
    ADMIN = "admin"
    USER = "competitor"

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str = Field(min_length=8)
    role: Role



class UserLogin(BaseModel):
    email: str
    password: str


class UserRead(BaseModel):
    id: int
    email: EmailStr
    username: str
    role: str

    class Config:
        from_attributes = True


class UserWithRanking(BaseModel):
    id: int
    email: EmailStr
    username: str
    role: str

    class Config:
        from_attributes = True
