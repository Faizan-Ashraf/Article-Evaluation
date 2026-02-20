import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Link from "next/link";
import { logout } from "@/store/authSlice";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user, token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch()

    const handleLagout = () => {
        dispatch(logout())
    }

    return (
        <div>
            <nav>
                <Link href={'/'}>Home</Link>
                {user?.role === 'ADMIN' && (
                    <>
                        <Link href={'/admin/create-competition'}>Create Competition</Link>
                        {/* <Link href={'/admin/create-competition'}>Create Competition</Link> */}

                    </>
                )}
                {user?.role === 'COMPETITOR' && (
                    <>
                        {/* TO DO */}
                    </>
                )}
                {token ? (
                    <button onClick={handleLagout}>Logout</button>
                ) : (
                    <Link href="/login">Login</Link>
                )

                }

            </nav>

            <main>{children}</main>
        </div>
    )

}