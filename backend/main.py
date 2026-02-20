from fastapi import FastAPI
from app.api.v1 import admin, auth, competitor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware( CORSMiddleware,
                    allow_origins=["http://localhost:3000"],
                      allow_credentials=True, allow_methods=["*"],
                        allow_headers=["*"], )


app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(competitor.router)


@app.get("/")
def root():
     return {"message": "Welcome"}