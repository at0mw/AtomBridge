import {Environment} from "@interfaces/core/environment.interface";

export const environment: Environment = {
  production: false,
  buildVersion: "test-build",
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
