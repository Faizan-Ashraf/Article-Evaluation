import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRegisterMutation } from "@/store/apiSlice";
import styles from '../styles/Auth.module.css'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [register, { isLoading }] = useRegisterMutation();

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //prevent refresh page, reset
        try {
            const response = await register({ username, email, password }).unwrap()
            router.push('/login')
        }
        catch (err: any) {
            setError(err.data?.detail || "Registration Failed!")
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>

                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    </div>
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
                    <button type="submit" disabled={isLoading} className={styles.loginBtn}>{isLoading ? 'Registering...' : 'Register'}</button>


                </form>
                <p className={styles.registerText}>Already have an account? <Link href="/login">Login</Link></p>
            </div>
        </div>
    )

}