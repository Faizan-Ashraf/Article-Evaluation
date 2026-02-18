import api from "./api";

import { AuthResponse,User, loginCredentials, RegisterData } from "../types";

export const authService = {

    async register(data: RegisterData):Promise<any>{
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    async login(credentials: loginCredentials): Promise<AuthResponse> {
        const formData = new FormData();
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);

        const response = await api.post('/auth/login',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
    
    
}