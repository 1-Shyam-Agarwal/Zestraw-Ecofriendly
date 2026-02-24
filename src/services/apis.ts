const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
    REIGSTER_API: BASE_URL + "/auth/register",
    LOGIN_API: BASE_URL + "/auth/login",
    FORGOT_PASSWORD_API: BASE_URL + "/auth/forgot-password",
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
};
