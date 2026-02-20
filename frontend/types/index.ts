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
    evaluationCriteria: string;
    createdBy: number;
    createdAt: string;
    is_active: boolean;
}

export interface Submission {
    id: number;
    content: string;
    competitionId: number;
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
    role: UserRole;
}
