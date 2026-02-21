import { useGetSubmissionsQuery, useEvaluateCompetitionMutation } from "@/store/apiSlice";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/protedtedRoutes";
import { useState } from "react";



export default function Submissions() {
    const router = useRouter()
    const { id } = router.query;
    const competitionId = Number(id)
    const { data: submissions, isLoading, refetch } = useGetSubmissionsQuery(competitionId);
    const [evaluate, { isLoading: evaluLoading }] = useEvaluateCompetitionMutation();
    const [error, setError] = useState('');

    const handleEvaluate = async () => {
        try {
            await evaluate(competitionId);
            refetch(); //submission refetch after evaluation
        } catch (err: any) {
            setError(err.response?.data?.detail || err.message || 'Evaluation failed')
        }
    }

    if (isLoading) {
        <div>Loading Submissions...</div>
    }

    return (
        <ProtectedRoute allowRoles={['ADMIN']}>
            <div>
                <h1>Submissions for Competition</h1>
                <button onClick={handleEvaluate} disabled={evaluLoading}>{evaluLoading ? 'Evaluating...' : 'Run AI Evaluation'}</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Content</th>
                        <th>Submitted At</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions?.map((sub) => (
                        <tr key={sub.id}>
                            <td>{sub.id}</td>
                            <td>{sub.content.substring(0, 50)}...</td>
                            <td>{new Date(sub.submitted_at).toLocaleString()}</td>
                            <td>{sub.score}</td>
                            <td>{sub.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ProtectedRoute>
    )
}