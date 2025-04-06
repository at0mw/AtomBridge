import {Environment} from "@interfaces/core/environment.interface";

export const environment: Environment = {
    production: true,
    buildVersion: "v1042.010425-2806",
    restApi: {
      url: 'http://localhost:5299'
    },
    websocket: {
      url: "test"
    },
    logging: {
      enabled: true,
      config: "/config/logging-config/development-log.config.json",
      maxLogCache: 500
    },
    devMode: true
  }
;
