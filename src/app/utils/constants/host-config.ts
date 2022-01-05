import { environment, environment1 } from '../../../environments/environment';
export const HOST_CONFIG = {
  MAIN_URL: {
    HOST_URL: environment.apiURL,
    BASE_URL: window.location.origin,
    VERSION_URL: '',
  },
};
export const HOST_CONFIG1 = {
  MAIN_URL: {
    HOST_URL: environment1.apiURL,
    BASE_URL: window.location.origin,
    VERSION_URL: '',
  },
};