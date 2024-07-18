// =====================================================
// THIS FILE WAS GENERATED, BE AWARE OF MANUAL EDITING!
// =====================================================
globalThis.createEnvConfig = function () {
    return {
        /**
         * frontend application base url
         */
        BASE_URL: "/frontend-dev/dustbins/",

        /**
         * base api url, it's prefix for all api calls
         */
        API_BASE_URL: "/frontend-dev/dustbins/mock-api",

        /**
         * url for log server
         */
        LOG_SERVER_URL: "",

        /**
         * signalR base URL
         */
        SIGNAL_R_URL: "/frontend-dev/dustbins/mock-api/signalR",

        /**
         * swagger url for backend services
         * supported prefixes:
         */
        SWAGGER_URL: "/frontend-dev/dustbins/mock-api",

        /**
         * identity server config (user login)
         */
        IDENTITY_SERVER: {
            // if authority url is empty, then dummy authenticator is used
            // this is useful for frontend only development environments - dev, pr dev
            AUTHORITY_URL: "",
            CLIENT_ID: "frontend.dev.identity",
            SCOPE: "frontend dev scope",
            APP_AUTH_BASE_URL: "",
        },

        /*
         * backend info config url, complete url, it's after base_url
         * can be empty string
         */
        BACKEND_BUILD_INFO_URL: "",

        /*
         * enable top banner which highlights test environment
         */
        ENABLE_TEST_BANNER: true,

        /**
         * application configuration
         */
        APP_CONFIG_URL: "",
    };
};

