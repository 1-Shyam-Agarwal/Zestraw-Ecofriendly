import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/PageLoader";

export default function OpenRoute({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();

    if (loading) {
        return <PageLoader message="Loading..." className="min-h-screen" />;
    }

    if (token === null) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" />;
    }
}
