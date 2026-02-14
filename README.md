# Article Evaluation

Article Evaluation is an application for managing article writing competitions, evaluating submissions, and ranking participants.


---

## Features

### Core Functionality
- **User Management**: Registration and authentication with role-based access (admin/competitor)
- **Competition Management**: Create competitions with deadline dates
- **Submissions**: Competitors can submit articles to competitions within deadlines
- **Evaluations**: Evaluators can score and provide feedback on submissions or enable AI Scoring system
- **Rankings**: Ranking based on evaluation scores

### Key Entities
- **Users**: Competition organizers and article competitors
- **Competitions**: Article writing contests with deadlines
- **Submissions**: Articles submitted by competitors
- **Evaluations**: Scores and feedback for submissions
- **Rankings**: Competitive rankings within competitions

## Tech Stack

### Backend
- **Framework**: FastAPI 0.128.5
- **Database**: PostgreSQL (via SQLAlchemy 2.0.46)
- **Database Migration**: Alembic 1.18.4
- **Authentication**: Python-Jose, JWT, Bcrypt
- **Async Driver**: asyncpg 0.31.0
- **Validation**: Pydantic 2.12.5
- **Server**: Uvicorn 0.40.0


---

## Project Layers

### /repositories
- Data Access Layer
### /routes
- API endpoints
### /schemas
- Pydantic validation schemas
### /service
- For business logic

---

## Installation

### Prerequisites
- Python 3.8+
- PostgreSQL database
- create venv (optional)
-  run `pip install -r requirements.txt`

### Backend Setup
1. Create .env file in the backend directory
2. add variables
    - DATABASE_URL
    - DATABASE_URL_ASYNC
    - JWT_SECRET_KEY
    - ALGORITHM
    - ACCESS_TOKEN_EXPIRE_MINUTES

3. Run database migrations:
   alembic upgrade head

4. Start the server:
   `uvicorn main:app --reload`

   The API will be available at `http://localhost:8000`
   API documentation: `http://localhost:8000/docs`


---

## API Endpoints

### Users
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `GET /users/{user_id}` - Get user details

### Competitions
- `POST /competitions` - Create competition
- `GET /competitions` - List all competitions
- `GET /competitions/{competition_id}` - Get competition details
- `PUT /competitions/{competition_id}` - Update competition
- `DELETE /competitions/{competition_id}` - Delete competition

### Submissions
- `POST /submissions` - Submit article
- `GET /submissions/{submission_id}` - Get submission details
- `GET /competitions/{competition_id}/submissions` - List competition submissions

### Evaluations
- `POST /evaluations` - Create evaluation
- `GET /evaluations/{evaluation_id}` - Get evaluation details
- `GET /submissions/{submission_id}/evaluations` - List submission evaluations

### Rankings
- `GET /competitions/{competition_id}/rankings` - Get competition rankings

---


## Database Schema

### Users
- `id` (Primary Key)
- `email` (Unique)
- `username`
- `password` (Hashed)
- `role` (Admin/Competitor)

### Competitions
- `id` (Primary Key)
- `title`
- `finished_at` (DateTime)
- `created_by` (Foreign Key -> Users)

### Submissions
- `id` (Primary Key)
- `content` (Text)
- `submitted_at` (DateTime)
- `competitor_id` (Foreign Key -> Users)
- `competition_id` (Foreign Key -> Competitions)

### Evaluations
- `id` (Primary Key)
- `score` (Integer)
- `feedback` (Text)
- `evaluated_at` (DateTime)
- `submission_id` (Foreign Key -> Submissions)

### Rankings
- `id` (Primary Key)
- `rank` (Integer)
- `competition_id` (Foreign Key -> Competitions)
- `submission_id` (Foreign Key -> Submissions)


## Authentication

The API uses JWT (JSON Web Tokens) for authentication:
1. Users register or login to receive a token
2. Include the token in the `Authorization: Bearer <token>` header for protected endpoints
3. Passwords are hashed using Bcrypt

---