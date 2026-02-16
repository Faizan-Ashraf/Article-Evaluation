from fastapi import FastAPI
from app.api.v1 import admin, auth, competitor

app = FastAPI()

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(competitor.router)

@app.get("/")
def root():
     return {"message": "Welcome"}