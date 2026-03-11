import { useRouter } from "next/router";
import { useGetSubmissionsQuery, useManualEvaluateSubmissionMutation } from "@/store/apiSlice";
import ProtectedRoute from "@/components/protedtedRoutes";
import Submissions from "../../submissions";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Evaluate(){
    const router = useRouter()
    const {id, subId} = router.query;

    const competitionId = Number(id);
    const submissionId = Number(subId);

    const {data: submissions, isLoading: subLoading } = useGetSubmissionsQuery(competitionId)

    const submission = submissions?.find((s)=> s.id==submissionId)

    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState('')

    const [manualEvaluate, isLoading] = useManualEvaluateSubmissionMutation()

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        try {
            await manualEvaluate({competition_id: competitionId, submission_id:submissionId, score, feedback}).unwrap()
            toast.success("Evaluation Completed!")
            router.push(`/admin/competitions/${competitionId}/submissions`);
        } catch (err) {
            alert('Failed to save evaluation');
        }
    }


    return (
        <ProtectedRoute allowRoles={['ADMIN']}>
            <div className="container">
                <h1>Manual Evaluation</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label>Article: </label>
                        <p>{submission?.content}</p>
                    </div>

                    <div>
                        <label>Score:</label>
                        <input type="number" min={0} max={100} value={score} onChange={(e) => setScore(e.target.valueAsNumber)}/>
                    </div>

                    <div>
                        <label>Feedback: </label>
                        <textarea cols={3} rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn">{isLoading ? 'Saving...' : 'Save'}</button>

                </form>
            </div>
        </ProtectedRoute>
    )
}
