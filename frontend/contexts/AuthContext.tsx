import {User} from '../types'
import { authService } from '@/services/auth';
import React, {useState, createContext, useContext, useEffect} from "react";
import { useRouter } from "next/router";

interface authContextType{
    user :User | null
    loading: boolean;
    login: (username: string, password: string)=>Promise<void>
    logout: ()=> void
    register: (data: any) => Promise<void>;
    token: string| null;
}

const AuthContext = createContext<authContextType|undefined>(undefined)


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] =useState(true);
    const [token, setToken] = useState<string|null>(null)
    const router = useRouter()

    useEffect(
        ()=>{
            const storedToken = localStorage.get('token')
            if(storedToken){
                setToken(storedToken)
                
                const storedUser = localStorage.getItem('user')
                if(storedUser){
                    setUser(JSON.parse(storedUser))
                }
            }


            setLoading(false);
        },[]
    )    
    const login = async (username: string, password: string)=>{
        const response = await authService.login({username, password});
        const access_token = response.token;
        localStorage.setItem('token', access_token);
        setToken(access_token);
        const payload = JSON.parse(atob(access_token.split('.')[1]))
        const user: User ={
            id: payload.id,
            email: payload.sub,
            username: payload.username,
            role: payload.role,
    
        }
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        router.push('/')

    }

    const logout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setToken(null)
        router.push('/login')
    }

    const register = async (data: any)=>{
        await authService.register(data);
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{user, loading, login, logout, register, token}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}