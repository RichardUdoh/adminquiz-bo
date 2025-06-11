export interface SettingsType {
  themeMode: string;
  themeDirection: string;
  themeColorPresets: string;
  themeLayout: string;
}

export const HOST_API_ = 'http://localhost:3000';
export const NO_DASHBOARD_API_ROOT_ = 'http://localhost:3000';
// export const NO_DASHBOARD_API_ROOT_ = 'https://api.brainsquiz.com/';
// export const HOST_API_ = 'https://api.brainsquiz.com/';

export const defaultSettings: SettingsType = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'default',
  themeLayout: 'horizontal'
};

export const HEADER = {
  MOBILE_HEIGHT: 60,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 270,
  DASHBOARD_WIDTH_FULL: `100%`,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32
};
