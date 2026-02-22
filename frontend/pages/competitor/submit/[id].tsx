import Link from "next/link";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/protedtedRoutes";
import React, { useState } from "react";
import { useSubmitArticleMutation, useGetCompetitionQuery } from "@/store/apiSlice";
import styles from '@/styles/SubmitArticle.module.css'


export default function Submit() {
    const router = useRouter()
    const { id } = router.query;
    const competition_id = Number(id)
    const { data: competition, isLoading: compLoading } = useGetCompetitionQuery(competition_id);
    const [content, setContent] = useState('');
    const [submitArticle, { isLoading }] = useSubmitArticleMutation()
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) { return }

        try {

            await submitArticle({ competition_id, content });
            alert("Article Submitted Successfully");

            router.push('/');

        } catch (err: any) {
            alert(err?.data?.detail || 'Failed to Submit Article')
        }
    }

    if(isLoading){
            <div className={styles.loader}>Loading...</div>
    }

    return (
        <ProtectedRoute allowRoles={['COMPETITOR']}>
            <div className="container">
                <h1>Submit Article for Competition {competition?.title}</h1>
                <p className={styles.p}><strong>Description:</strong> {competition?.description ? competition.description: 'N/A'}</p>
                <p className={styles.p}><strong>Evaluation Criteria:</strong> {competition?.description ? competition.evaluation_criteria: 'N/A'}</p>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label>Your Article</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={10}
                        />
                    </div>
                    
                    <button type="submit" disabled={isLoading} className="btn">
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </ProtectedRoute>
    )
}