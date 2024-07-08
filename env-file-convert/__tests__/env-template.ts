/**
 * Strong typed environment configuration template.
 * It's processed and finished as the the env.js, which is used in the main application html.
 */
window.createEnvConfig = function () {
    return {
        /**
         * frontend application base url
         */
        BASE_URL: "<base_url>",

        /**
         * base api url, it's prefix for all api calls
         */
        API_BASE_URL: "<api_base_url>",

        /**
         * url for log server
         */
        LOG_SERVER_URL: "<log_server_url>",

        /**
         * signalR base URL
         */
        SIGNAL_R_URL: "<signal_r_url>",

        /**
         * swagger url for backend services
         * supported prefixes:
         */
        SWAGGER_URL: "<swagger_url>",

        /**
         * identity server config (user login)
         */
        IDENTITY_SERVER: {
            // if authority url is empty, then dummy authenticator is used
            // this is useful for frontend only development environments - dev, pr dev
            AUTHORITY_URL: "<id_server_authority_url>",
            CLIENT_ID: "pd3.waste.js.client",
            SCOPE: "openid profile offline_access email roles pd1_identity_resource pd3_waste_apigateway",
            APP_AUTH_BASE_URL: "<id_server_app_auth_base_url>",
        },

        /*
         * backend info config url, complete url, it's after base_url
         * can be empty string
         */
        BACKEND_BUILD_INFO_URL: "<backend_build_info_url>",

        /*
         * enable top banner which highlights test environment
         */
        ENABLE_TEST_BANNER: true,

        /**
         * application configuration
         */
        APP_CONFIG_URL: "<app_config_url>",
    };
};
