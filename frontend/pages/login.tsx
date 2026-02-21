import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import Link from "next/link";
import { setCredentials } from "@/store/authSlice";
import { useLoginMutation } from "@/store/apiSlice";
import styles from '../styles/Auth.module.css'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }).unwrap()
            const payload = JSON.parse(atob(response.access_token.split('.')[1]))
            const user = {
                id: payload.user_id || payload.id,
                username: payload.username,
                email: payload.sub,
                role: payload.role
            };
            dispatch(setCredentials({ user, token: response.access_token }))
            router.push('/')
        } catch (err: any) {
            setError(err.data?.detail || err.message || 'Login failed');
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.errorText}>{error}</p>}
                    <button type="submit" className={styles.loginBtn}>{isLoading ? 'Signing in...' : 'Login'}</button>
                </form>
                <p className={styles.registerText}>Don't have an account? <Link href="/register">Register here</Link></p>
            </div>
        </div>
    )

}