export interface EnvOptions {
    baseUrl: string;
    apiBaseUrl: string;
    /**
     * optional log server url,
     * used mostly in staging, production, staging environments
     */
    logServerUrl?: string;
    /** optional, not all modules use signalR push */
    signalRUrl?: string;
    /** url for backend API version info */
    swaggerUrl: string;

    identityServer: {
        authorityUrl: string;
        appAuthBaseUrl: string;
    }

    /** optional backend build info, mostly for tests environments */
    backendBuildInfoUrl?: string;

    enableTestBanner: boolean;

    /**
     * frontend application configuration url - config.json
     * it's obsolete, used only in dustbins
     * will be moved into backend API call
     */
    appConfigUrl?: string;
}