import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function OpenRoute({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();

    if (loading) return null;

    if (token === null) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" />;
    }
}
