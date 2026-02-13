from app.schemas import submissionSchema
from app.service import submissionService
from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependencies.dependencies import get_db
from app.core.auth import verify_token

router = APIRouter(prefix="/submissions", tags=["submissions"])
@router.post("/{competition_id}", response_model=submissionSchema.SubmissionRead, status_code=status.HTTP_201_CREATED)
async def create_submission(submission: submissionSchema.SubmissionCreate,
                            db: AsyncSession = Depends(get_db),
                            user = Depends(verify_token), competition_id: int = None):
                            
    
    if user.get("role") != "competitor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only competitors can create submissions")
    
    return await submissionService.create_submission(submission=submission,
                                                        db=db, user_id=int(user.get("id")), competition_id=competition_id)

@router.get("/{competition_id}", response_model=list[submissionSchema.SubmissionRead], status_code=status.HTTP_200_OK)
async def get_competition_submissions(competition_id: int,
                            db: AsyncSession = Depends(get_db),
                            user = Depends(verify_token)):
    
    if user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only admins can view competition submissions")
    
    return await submissionService.get_submissions(db=db, competition_id=competition_id)