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

### Auth
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Admin
- `POST /admin/competition` - Create competition
- `GET /admin/competitions/{id}/submissions` - Get Submissions
- `GET /admin/evaluate/{id}/competition` - ai evaluate complete competition

### Competitor
- `GET /competitor/competitions` - get active competitions
- `POST /competitor/submit-article` Submit article
- `GET /competitor/my-results` get results of all submissions

### Home
- `GET /home//all-competitions` - get all competitions for home page for both admin and competitor

---


## Database Schema

### Users
- `id` (Primary Key)
- `email` (Unique)
- `username` (String)
- `password` (Hashed)
- `role` (ADMIN/COMPETITOR)

### Competitions
- `id` (Primary Key)
- `title` (String)
- `description` (Text)
- `evaluation_criteria` (Text)
- `created_by` (Foreign Key -> Users)
- `is_active` (Boolean)
- `created_at`

### Submissions
- `id` (Primary Key)
- `content` (Text)
- `submitted_at` (DateTime)
- `competitor_id` (Foreign Key -> Users)
- `competition_id` (Foreign Key -> Competitions)
- `feedback` (TEXT)
- `score` (Integer)
- `evaluated_at`
- `status` (Pending, Evaluated)




## Authentication

The API uses JWT (JSON Web Tokens) for authentication:
1. Users register or login to receive a token
2. Include the token in the `Authorization: Bearer <token>` header for protected endpoints
3. Passwords are hashed using Bcrypt

---