import axios from 'axios';
import { HOST_API_, NO_DASHBOARD_API_ROOT_ } from '../config';

export const HOST_API = HOST_API_;
export const NO_DASHBOARD_API_ROOT = NO_DASHBOARD_API_ROOT_;

const axiosInstance = axios.create({
  baseURL: HOST_API
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

const noDashboardApi = axios.create({
  baseURL: NO_DASHBOARD_API_ROOT
});

noDashboardApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export { noDashboardApi };
