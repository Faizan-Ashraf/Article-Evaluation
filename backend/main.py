from fastapi import FastAPI
from app.routes import userRoutes
from app.routes import competitionRoutes
from app.routes import submissionRoute

app = FastAPI()

app.include_router(userRoutes.router)
app.include_router(competitionRoutes.router)
app.include_router(submissionRoute.router)

@app.get("/")
def root():
     return {"message": "Welcome"}