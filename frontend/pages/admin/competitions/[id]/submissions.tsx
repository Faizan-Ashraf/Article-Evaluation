import { useGetSubmissionsQuery, useEvaluateCompetitionMutation, useGetCompetitionQuery } from "@/store/apiSlice";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/protedtedRoutes";
import { useState } from "react";
import styles from "@/styles/Submissions.module.css"
import Link from "next/link";



export default function Submissions() {
    const router = useRouter()
    const { id } = router.query;
    const competitionId = Number(id)
    const { data: competition, isLoading: compLoading } = useGetCompetitionQuery(competitionId);
    const { data: submissions, isLoading, refetch } = useGetSubmissionsQuery(competitionId);
    const [evaluate, { isLoading: evaluLoading }] = useEvaluateCompetitionMutation();
    const [error, setError] = useState('');

    const handleEvaluate = async () => {
        try {
            await evaluate(competitionId).unwrap();
            refetch(); //submission refetch after evaluation
        } catch (err: any) {
            setError(err?.data?.detail || err?.message || 'Evaluation failed');
        }
    }

    if (isLoading || compLoading || evaluLoading) {
        return (<div className="loader">
            <h1>
                Loading Submissions...

            </h1>
        </div>)
    }

    return (
        <ProtectedRoute allowRoles={['ADMIN']}>
            {error && <p className="errorText">{error}</p>}
            <div className={styles.container}>


                <h1 className={styles.title}>{competition?.title} Submissions</h1>
                <div className={styles.competitionInfo}>
                    <div style={{ color: "#111827" }}>
                        Created At:
                        {new Date(competition?.created_at ? competition.created_at : "N/A").toLocaleString()}
                    </div>
                    <div >
                        <span className={competition?.is_active ? styles.activeStatus : styles.inactiveStatus}>
                            {competition?.is_active
                                ? "Active"
                                : "Closed"}

                        </span>
                    </div>
                </div>
                <button onClick={handleEvaluate} disabled={evaluLoading} className={styles.evaluateBtn}>{evaluLoading ? 'Evaluating...' : 'Run AI Evaluation'}</button>
                <div className="tableContainer">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Content</th>
                                <th>Submitted At</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions?.map((sub) => (

                                <tr onClick={()=>router.push(`/admin/competitions/${Number(competitionId)}/submissions/${Number(sub.id)}/evaluate`)}>

                                    <td title={sub.content}>{sub.content.substring(0, 50)}...</td>

                                    <td>{new Date(sub.submitted_at).toLocaleString()}</td>
                                    <td>{sub.score}</td>
                                    <td className={sub.status === "EVALUATED" ? styles.activeStatus : styles.inactiveStatus}>{sub.status}</td>
                                    <td>{sub.rank}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoute >
    )
}