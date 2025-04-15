import {Environment} from "@interfaces/core/environment.interface";

export const environment: Environment = {
    production: true,
    buildVersion: "v1042.010425-2806",
    restApi: {
      url: 'http://192.168.1.113:8080'
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
