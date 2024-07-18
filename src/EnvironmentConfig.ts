export interface EnvironmentConfig {
    BASE_URL: string;
    API_BASE_URL: string;
    LOG_SERVER_URL: string;
    SIGNAL_R_URL: string;
    SWAGGER_URL: string;
    IDENTITY_SERVER: {
        AUTHORITY_URL: string;
        CLIENT_ID: string;
        SCOPE: string;
        APP_AUTH_BASE_URL: string;
    };
    ENABLE_TEST_BANNER: boolean;
}
