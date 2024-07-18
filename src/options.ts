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
        clientId: string;
        scope: string;
        appAuthBaseUrl: string;
    };

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

export function createDefaultOptions(identityClientId: string, identityScope: string): EnvOptions {
    return {
        baseUrl: "",
        apiBaseUrl: "",
        enableTestBanner: false,
        identityServer: {
            appAuthBaseUrl: "",
            clientId: identityClientId,
            scope: identityScope,
            authorityUrl: "",
        },
        swaggerUrl: "",
    };
}

export function setOptionsByBaseUrl(options: EnvOptions, baseUrl: string) {
    options.baseUrl = baseUrl;
    options.apiBaseUrl = baseUrl + "web/api";
    options.signalRUrl = baseUrl + "web/signalR";
    options.swaggerUrl = options.apiBaseUrl;
    options.identityServer.appAuthBaseUrl = baseUrl;
    return options;
}

export function enableOptionAppConfig(
    options: EnvOptions,
    configFile = "config.json",
) {
    options.appConfigUrl = options.baseUrl + configFile;
    return options;
}

export function setOptionsByCustomerLocal(
    options: EnvOptions,
    customer: string,
    moduleName: string,
) {
    options.baseUrl = "/" + customer + "/Modules/" + moduleName + "/";
    options = setOptionsByBaseUrl(options, options.baseUrl);
    options.identityServer.authorityUrl = "/" + customer + "/identity";
    return options;
}

export function setOptionsSignalRMock(options: EnvOptions) {
    options.signalRUrl = options.apiBaseUrl + "/signalR";
    return options;
}

export function setOptionsByMockServer(
    options: EnvOptions,
    suffix: "local" | "dev",
) {
    options.baseUrl = "/";
    options.apiBaseUrl = "/mock-server-" + suffix;
    options.swaggerUrl = options.apiBaseUrl;
    options = setOptionsSignalRMock(options);
    // use local commit file for local development of backend build info
    options.backendBuildInfoUrl = options.baseUrl +
        "backend-build-example.json";
    options.enableTestBanner = true;
    return options;
}

export function setOptionsBackendInfoUrl(options: EnvOptions, url?: string) {
    options.backendBuildInfoUrl = options.baseUrl +
        (url ?? "backend-build-info/build-info.json");
    return options;
}

/**
 * nice build options pipeline :-)
 * @param funcs
 * @returns (options: EnvOptions) => EnvOptions
 */
export function buildOptionsPipe(
    ...funcs: ((options: EnvOptions) => EnvOptions)[]
) {
    return (value: EnvOptions) =>
        funcs.reduce((value, fn) => {
            return fn(value);
        }, value);
}
