export interface Environment {
  production: boolean;
  buildVersion: string;
  restApi: {
    url: string;
  };
  websocket: {
    url: string;
  };
  logging: {
    enabled: boolean;
    config: string;
    maxLogCache: number;
  };
  developer: {
    enabled: boolean;
  }
}
