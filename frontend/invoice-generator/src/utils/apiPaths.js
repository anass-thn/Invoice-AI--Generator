export const API_BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    Auth: {
        Login: "/api/auth/login",
        Register: "/api/auth/register",
        GET_PROFILE: "/api/auth/me",
        UPDATE_PROFILE: "/api/auth/update-profile"
    },
    INVOICE: {
        CREATE: "/api/invoices",
        GET_ALL_INVOICE: "/api/invoices",
        GET_INVOICE_BY_ID: (id) => `/api/invoices/${id}`,
        UPDATE_INVOICE: (id) => `/api/invoices/${id}`,
        UPDATE_INVOICE_STATUS: (id) => `/api/invoices/${id}/status`,
        DELETE_INVOICE: (id) => `/api/invoices/${id}`
    },
    AI: {
        PARSE_INVOICE_TEXT: "/api/ai/parse-invoice",
        GENERATE_REMINDER: "/api/ai/generate-reminder",
        GET_DASHBOARD_SUMMARY: "/api/ai/dashboard-summary"
    }
};