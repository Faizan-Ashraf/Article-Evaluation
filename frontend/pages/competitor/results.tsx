import { useRouter } from "next/router";
import { useGetResultsQuery, useGetCompetitionsQuery } from "@/store/apiSlice";
import ProtectedRoute from "@/components/protedtedRoutes";
import styles from '@/styles/Results.module.css'


export default function GetResults() {
    const { data: submissions, isLoading } = useGetResultsQuery();
    const { data: competitions, isLoading: compLoader } = useGetCompetitionsQuery();

    const getCompetitionTitle = (competitionId: number) =>
        competitions?.find((c) => c.id === competitionId)?.title ?? "—";


    if (isLoading || compLoader) {
        return <div className="loader">
            <h1>
                Loading...
            </h1>

        </div>;
    }


    return (
        <ProtectedRoute allowRoles={['COMPETITOR']}>
            <div className={styles.container}>
                <h1>My Results</h1>
                <div className="tableContainer">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Competition</th>
                                <th>Submitted At</th>
                                <th>Score</th>
                                <th>Feedback</th>
                                <th>Status</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions?.map((sub) => (
                                <tr key={sub.id}>
                                    <td>{getCompetitionTitle(sub.competition_id)}</td>
                                    <td>{new Date(sub.submitted_at).toLocaleString()}</td>
                                    <td>{sub.score}</td>
                                    <td>{sub.feedback}</td>
                                    <td>{sub.status}</td>
                                    <td>{sub.rank}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoute>
    );

}