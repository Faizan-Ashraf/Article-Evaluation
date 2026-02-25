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

    if len(user.password) < 8:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must have at least 8 characters!")

    hashed_password = auth.hash_password(user.password)
    user.password = hashed_password
    return await userRepository.register_new_user(db, user)


async def login_user(user: userSchema.UserLogin, db):
    db_user = await userRepository.get_user(db, user.email)
    if not db_user:
        log.warning("Invalid email!")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email!")

    if not auth.verify_password(user.password, db_user.password):
        log.warning("Invalid password!")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password!")

    token = auth.create_token(data={"sub": db_user.email, "role": db_user.role.value, "user_id": db_user.id, "username": db_user.username})
    return {"access_token": token, "token_type": "bearer"}