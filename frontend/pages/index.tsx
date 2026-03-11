import { useGetCompetitionsQuery } from "@/store/apiSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import styles from "@/styles/Home.module.css"



export default function Home() {
    const router = useRouter()
    const { data: competitions, isLoading, refetch } = useGetCompetitionsQuery()
    const { user, token } = useAppSelector((state) => state.auth)

    if (isLoading) {
        return (
            <div className="loader">
                <h1>
                    Loading...
                </h1>

            </div>
        )
    }



    return (
        <div className={styles.container}>
            <h1 className={styles.title}> Welcome to Article Evaluation Application</h1>
            <div className={styles.grid}>

                {competitions?.map((sub) => (
                    <Link key={sub.id} href={user?.role === "ADMIN" ? `/admin/competitions/${Number(sub.id)}/submissions` : `/competitor/submit/${Number(sub.id)}`}>
                        <div className={styles.card} >
                            <h1 className={styles.cardTitle}>Title: {sub.title}</h1>
                            <p className={styles.cardDescription}>Description: {sub.description.substring(0, 150)}...</p>
                            <i className={sub.is_active ? styles.active : styles.inactive}>Status: {sub.is_active ? "Active" : "Closed"}</i>
                        </div>
                    </Link>
                )
                )}

            </div>

        </div>

    )
}
