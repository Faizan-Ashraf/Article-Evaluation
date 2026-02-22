import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateCompetitionMutation } from "@/store/apiSlice";
import ProtectedRoute from "@/components/protedtedRoutes";
import styles from "@/styles/CreateCompetition.module.css"



export default function CreateCompetition(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [evaluationCriteria, setEvaluationCriteria] = useState('');
    const [error, setError] = useState('');

    const [createCompetition, {isLoading}] = useCreateCompetitionMutation()
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        try {
            await createCompetition({ title, description, evaluation_criteria: evaluationCriteria }).unwrap();
            router.push('/')
        } catch (err: any) {
            setError(err.response?.data?.detail || err.message || 'Failed to create competition');
        }
    }


    return (
        <ProtectedRoute allowRoles={['ADMIN']}>
            <div className="container">
                <h1>Create Competition</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label>Title: </label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </div>

                    <div>
                        <label>Description: </label>
                        <textarea cols={3} rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                     <div>
                        <label>Criteria: </label>
                        <textarea cols={3} rows={4} value={evaluationCriteria} onChange={(e) => setEvaluationCriteria(e.target.value)}></textarea>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="btn">{isLoading? 'Creating Competition...' : 'Create Competition'}</button>

                </form>
            </div>
        </ProtectedRoute>
    )
}