// export const BASE_URL = 'http://192.168.10.177:8080/api/v1/app';
export const BASE_URL = 'https://app.amarblood.net/api/v1/app';


export const API = {
    AUTH: {
        SUBMIT_OTP: '/auth/submit-otp',
        REGISTER: '/auth/register',
        CHECK_USER: '/auth/check-user',
        PROFILE_ROUTE: '/auth/profile',
        UPDATE_PUSH_TOKEN: '/auth/update-push-token',
    },
    LOCATION: {
        GET_DISTRICTS: '/location/districts',
        GET_AREAS: '/location/areas',
    },
    REQUEST: {
        REQUESTS_ROUTE: '/request-details',
        DONATIONS_ROUTE: '/request-details/donation',
        DONATE_REQUESTS_ROUTE: '/request-details/donate-request',
        SEND_OTP_FOR_DONAR_VERIFICATION: '/request-details/send-donar-verification-otp',
        VERIFY_OTP_FOR_DONAR_VERIFICATION: '/request-details/verify-donar-verification-otp',
    },
    NOTIFICATION: {
        NOTIFICATIONS_ROUTE: '/notifications',
    },
    HISTORY: {
        HISTORY_ROUTE: '/history',
    },
    HOME: {
        HOME_ROUTE: '/home',
    },
}
