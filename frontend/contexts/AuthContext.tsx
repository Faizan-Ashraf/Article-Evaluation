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


export const AuthProvider: React.FC<{children: React.ReactNode}>=({children})=>{
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] =useState(true);
    const [token, setToken] = useState<string|null>(null)
    const router = useRouter()

    useEffect(
        ()=>{
            const storedToken = localStorage.get('token')
            if(storedToken){
                setToken(storedToken)
                
            }
        }
    )
}