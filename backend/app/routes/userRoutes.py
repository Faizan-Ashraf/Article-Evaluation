from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import userSchema

from app.service import userService
from app.dependencies.dependencies import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=userSchema.UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(user: userSchema.UserCreate, db: AsyncSession = Depends(get_db)):
    return await userService.register_user(user=user, db=db)


@router.post("/login")
async def login_user(user: userSchema.UserLogin, db: AsyncSession = Depends(get_db)):
    token = await userService.authenticate_user(db, user.email, user.password)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return {"message": "Login successful", "token": token, "token_type": "bearer"}
