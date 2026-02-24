const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
    REIGSTER_API: BASE_URL + "/auth/register",
    LOGIN_API: BASE_URL + "/auth/login",
    FORGOT_PASSWORD_API: BASE_URL + "/auth/forgot-password",
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
    UPDATE_ADDRESS_API: BASE_URL + "/auth/update-address",
    UPDATE_PROFILE_API: BASE_URL + "/auth/update-profile",
    UPDATE_PASSWORD_API: BASE_URL + "/auth/update-password",
    GET_USER_DETAILS_API: BASE_URL + "/auth/me",
    PHONE_AUTH_API: BASE_URL + "/auth/phone",
};

export const productEndpoints = {
    GET_ALL_PRODUCTS_API: BASE_URL + "/products",
    GET_PRODUCT_DETAILS_API: BASE_URL + "/products/",
};

export const orderEndpoints = {
    CREATE_ORDER_API: BASE_URL + "/orders",
    GET_MY_ORDERS_API: BASE_URL + "/orders/myorders",
};
