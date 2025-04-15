import {Environment} from "@interfaces/core/environment.interface";

export const environment: Environment = {
  production: false,
  buildVersion: "test-build",
  restApi: {
    url: 'http://192.168.1.113:8080'
  },
  websocket: {
    url: "ws://192.168.1.113:8080/ws"
  },
  logging: {
    enabled: true,
    config: "/config/logging-config/development-log.config.json",
    maxLogCache: 500
  },
  devMode: true
}
