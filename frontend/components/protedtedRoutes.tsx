import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowRoles?: Array<'ADMIN' | 'COMPETITOR'>;

}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowRoles }) => {
    const { user, token } = useAppSelector((state)=> state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!token){
            router.push('/login')
        }
        else if(user && allowRoles && !allowRoles.includes(user.role)){
            router.push('/')
        }
    }, [user, token, router, allowRoles]);

    if (!token) {
        return <div>Loading...</div>;
    }

    if (allowRoles && user && !allowRoles.includes(user.role)) {
        return null
    };

    return <>{children}</>;
}

export default ProtectedRoute;