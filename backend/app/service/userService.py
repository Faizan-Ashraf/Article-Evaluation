from app.repositories import userRepository
from app.schemas import userSchema
from app.core import auth
from fastapi import HTTPException, status
import logging as log

async def register_user(user: userSchema.UserCreate, db):
    db_user = await userRepository.get_user(db, user.email)
    if db_user:
        log.warning("User with this email already exists!")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists!") 

    hashed_password = auth.hash_password(user.password)
    user.password = hashed_password
    return await userRepository.insert_new_user(db, user)


async def authenticate_user(db, email: str, password: str):
    user = await userRepository.get_user(db, email)
    if not user:
        return False
    if not auth.verify_password(password, user.password):
        return False
    
    token_data = {"sub": user.email, "role": user.role, "id": user.id}
    token = auth.create_token(token_data)
    return token

