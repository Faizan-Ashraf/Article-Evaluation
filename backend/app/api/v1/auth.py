from app.models.userModel import User
from app.core import auth
from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependencies.dependencies import get_db
from app.schemas import userSchema
from app.service import authService
from app.repositories import userRepository

router = APIRouter(prefix="/auth", tags=["auth"])



@router.post("/register", response_model=userSchema.UserRead, status_code=status.HTTP_201_CREATED)
async def register_user(user: userSchema.UserCreate, db: AsyncSession = Depends(get_db)):
    return await authService.register_user(user=user, db=db)

@router.post("/login")
async def login_user(user: userSchema.UserLogin, db: AsyncSession = Depends(get_db)):
    return await authService.login_user(user=user, db=db)




