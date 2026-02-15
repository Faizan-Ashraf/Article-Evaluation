from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models import userModel
from app.schemas import userSchema

async def get_user(db: AsyncSession, email: str):
    result = await db.execute(select(userModel.User).where(userModel.User.email==email))
    return result.scalar_one_or_none()

async def get_users(db: AsyncSession):
    result = await db.execute(select(userModel.User))
    return result.scalars().all()

async def register_new_user(db:AsyncSession, user: userSchema.UserCreate):
    db_user = userModel.User(email=user.email,username=user.username, password=user.password,role=user.role)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user
