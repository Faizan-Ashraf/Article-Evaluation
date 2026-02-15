from pydantic import EmailStr, BaseModel, Field
from typing import Optional
from enum import Enum



class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str = Field(min_length=8)
    role: Optional[str] = "competitor"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRead(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True


