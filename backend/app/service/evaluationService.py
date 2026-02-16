from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories import submissionRepository, competitionRepository
from app.schemas import submissionSchema, competitionSchema
from fastapi import HTTPException, status
from openai import OpenAI
import json
from dotenv import load_dotenv

import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

ai = OpenAI(api_key=OPENAI_API_KEY)


def ai_evaluation(submission: submissionSchema.SubmissionRead, competition: competitionSchema.CompetitionRead):
        prompt = f"""
    You are a professional article evaluator.

    Evaluate the article based on:
    {competition.evaluation_criteria}

    Provide:
    - A score between 1 and 100
    - Detailed constructive feedback

    Return ONLY valid JSON in this format:
    {{
        "score": number,
        "feedback": "string"
    }}

    Topic:
    {competition.title}

    Article:
    {submission.content}
    """
        try:
            response = ai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
            )
            result = response.choices[0].message.content
            return json.loads(result)
        except Exception as e:
            print(f"Error evaluating submission {submission.id}: {e}")
            


async def evaluate_submissions(db, competition_id:int):
        
        competition = await competitionRepository.get_by_id(db, competition_id)
        if not competition:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Competition not found!")
        

        submissions = await submissionRepository.get_by_competitionId(db, competition_id)
        if not submissions:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No submissions found for this competition!")
        
        
        for submission in submissions:
            if submission.status.value == "pending":
                evaluation_result = ai_evaluation(submission, competition)
                await submissionRepository.update_submission(db, evaluation_result["score"], evaluation_result["feedback"], submission.id)
            

        return submissions
        