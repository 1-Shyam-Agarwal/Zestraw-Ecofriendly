import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { REIGSTER_API, LOGIN_API, FORGOT_PASSWORD_API, RESET_PASSWORD_API } = endpoints;

export function getPasswordResetToken(email, setEmailSent) {
    return async () => {
        const toastId = toast.loading("Verifying email and sending reset link...", {
            description: "Please wait a moment."
        });
        try {
            const response = await apiConnector("POST", FORGOT_PASSWORD_API, { email });

            toast.success("Password Reset Email Sent", {
                id: toastId,
                description: `A reset link has been sent to ${email}. Check your inbox and spam folder.`,
                duration: 5000,
            });
            setEmailSent(true);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Failed to send reset email";
            toast.error("Process Failed", {
                id: toastId,
                description: errorMessage,
                duration: 4000
            });
        }
    };
}

export function resetPassword(password, token, navigate) {
    return async () => {
        const toastId = toast.loading("Updating your security credentials...", {
            description: "Setting your new password."
        });
        try {
            const response = await apiConnector("PUT", `${RESET_PASSWORD_API}/${token}`, { password });


            toast.success("Security Updated", {
                id: toastId,
                description: "Your password has been reset successfully. You can now log in.",
                duration: 5000,
            });
            navigate("/login");
        } catch (error) {

            const errorMessage = error.response?.data?.error || error.message || "Failed to reset password";
            toast.error("Reset Failed", {
                id: toastId,
                description: errorMessage,
                duration: 4000
            });
        }
    };
}

export function login(email, password, navigate, setAuth) {
    return async () => {
        const toastId = toast.loading("Authenticating...", {
            description: "Checking your credentials."
        });
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            if (!response.data.success) {
                throw new Error(response.data.error);
            }

            toast.success("Welcome Back!", {
                id: toastId,
                description: "You have signed in successfully.",
                duration: 3000,
            });
            setAuth(response.data.data, response.data.token);
            navigate("/");
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Login failed. Please check your email and password.";
            toast.error("Authentication Error", {
                id: toastId,
                description: errorMessage,
                duration: 4000
            });
        }
    };
}

export function signUp(
    fullName,
    email,
    password,
    accountType,
    navigate
) {
    return async () => {
        const toastId = toast.loading("Creating your account...", {
            description: "This will only take a second."
        });
        try {
            const response = await apiConnector("POST", REIGSTER_API, {
                fullName,
                email,
                password,
                accountType,
            });

            if (!response.data.success) {
                throw new Error(response.data.error);
            }
            toast.success("Account Created!", {
                id: toastId,
                description: "Welcome to the Zestraw family!",
                duration: 5000,
            });
            navigate("/login");
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Registration failed. Please try again.";
            toast.error("Registration Failed", {
                id: toastId,
                description: errorMessage,
                duration: 4000
            });
            navigate("/signup");
        }
    };
}
