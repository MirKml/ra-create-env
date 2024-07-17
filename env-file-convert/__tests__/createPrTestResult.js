// =====================================================
// THIS FILE WAS GENERATED, BE AWARE OF MANUAL EDITING!
// =====================================================
globalThis.createEnvConfig = function () {
    return {
        /**
         * frontend application base url
         */
        BASE_URL: "/SAKO_TEST/Modules/crm/prid-1543/",

        /**
         * base api url, it's prefix for all api calls
         */
        API_BASE_URL: "/SAKO_TEST/Modules/crm/web/api",

        /**
         * url for log server
         */
        LOG_SERVER_URL: "",

        /**
         * signalR base URL
         */
        SIGNAL_R_URL: "/SAKO_TEST/Modules/crm/web/signalR",

        /**
         * swagger url for backend services
         * supported prefixes:
         */
        SWAGGER_URL: "/SAKO_TEST/Modules/crm/web/api",

        /**
         * identity server config (user login)
         */
        IDENTITY_SERVER: {
            // if authority url is empty, then dummy authenticator is used
            // this is useful for frontend only development environments - dev, pr dev
            AUTHORITY_URL: "/SAKO_TEST/identity",
            CLIENT_ID: "pd3.waste.js.client",
            SCOPE: "openid profile offline_access email roles pd1_identity_resource pd3_waste_apigateway",
            APP_AUTH_BASE_URL: "/SAKO_TEST/Modules/crm/",
        },

        /*
         * backend info config url, complete url, it's after base_url
         * can be empty string
         */
        BACKEND_BUILD_INFO_URL: "/SAKO_TEST/Modules/crm/prid-1543/backend-build-info/build-info.json",

        /*
         * enable top banner which highlights test environment
         */
        ENABLE_TEST_BANNER: true,

        /**
         * application configuration
         */
        APP_CONFIG_URL: "/SAKO_TEST/Modules/crm/config.json",
    };
};

