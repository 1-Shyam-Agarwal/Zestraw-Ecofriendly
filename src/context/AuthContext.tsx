import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
    _id: string;
    fullName: string;
    email: string;
    accountType: string;
    shippingAddress?: {
        address: string;
        city: string;
        state: string;
        zip: string;
    };
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    setAuth: (user: User | null, token: string | null) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch (e) {
                console.error("Error parsing stored user", e);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const setAuth = (newUser: User | null, newToken: string | null) => {
        setUser(newUser);
        setToken(newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("token", newToken);
    };

    const logout = () => {
        setAuth(null, null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, setAuth, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
