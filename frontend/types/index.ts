export type UserRole = 'ADMIN' | 'COMPETITOR';

export interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
}

export interface Competition {
    id: number;
    title: string;
    description: string;
    evaluation_criteria: string;
    created_by: number;
    created_at: string;
    is_active: boolean;
}

export interface Submission {
    id: number;
    content: string;
    competition_id: number;
    submitted_at: string;
    feedback: string;
    score: number;
    evaluated_at: string;
    status: 'PENDING' | 'EVALUATED';
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface loginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}
