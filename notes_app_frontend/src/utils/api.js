const API_BASE = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';

/**
 PUBLIC_INTERFACE
 fetchBackendConfig
 Return object with detected backend settings; if no backend configured, indicates offline mode.
*/
export function fetchBackendConfig() {
  return {
    enabled: Boolean(API_BASE),
    baseUrl: API_BASE,
  };
}
