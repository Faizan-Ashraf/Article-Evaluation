import { useRouter } from "next/router";
import { use, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";


interface ProtectedRouteProps {
    children: React.ReactNode;
    allowRoles?: Array<'ADMIN' | 'COMPETITOR'>;

}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowRoles }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading){
            if (!user){
                router.push('/login') //not logged in
            }
            else if (allowRoles && !allowRoles.includes(user.role)){
                router.push('/') //logged in but not authorized;
            }

        }
    }, [user, loading, router, allowRoles]);

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    if (allowRoles && !allowRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}

export default ProtectedRoute;