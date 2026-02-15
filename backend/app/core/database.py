from dotenv import load_dotenv
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

DB_URL=os.getenv("DATABASE_URL_ASYNC")
engine = create_async_engine(
    DB_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    connect_args={"statement_cache_size": 0}
)

sessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit= False
)

Base = declarative_base()


from app.models import userModel, competitionModel, submissionsModel