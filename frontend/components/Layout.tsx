import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Link from "next/link";
import { logout } from "@/store/authSlice";
import styles from '../styles/Layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user, token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch()

    const handleLagout = () => {
        dispatch(logout())
    }

    return (
        <div className={styles.layout}>
            <nav className={styles.navbar}>
                <div className={styles.navLeft}>

                    <Link href={'/'} className={styles.navLink}>Home</Link>
                    {user?.role === 'ADMIN' && (
                        <>
                            <Link href={'/admin/create-competition'} className={styles.navLink}>Create</Link>

                        </>
                    )}
                    {user?.role === 'COMPETITOR' && (
                        <>
                            <Link href={'/competitor/results'} className={styles.navLink}>Results</Link>
                        </>
                    )}
                </div>
                <div className={styles.navRight}>
                    {token ? (
                        <button onClick={handleLagout} className={styles.btn}>Logout</button>
                    ) : (
                        <Link href="/login" className={styles.btn}>Login</Link>
                    )

                    }
                </div>

            </nav>

            <main className={styles.mainContent}>{children}</main>
        </div>
    )

}