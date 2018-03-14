export const START = '_START'
export const SUCCESS = '_SUCCESS'
export const FAIL = '_FAIL'
export const PROCESS = '_PROCESS'
export const RESET = '_RESET'
export const FAILED = '_FAILED'
export const OVER = '_OVER'


export const ERROR = 'ERROR'

export const TOKEN = 'access_token'
export const LOCATION_ID = 'location_id'
export const REAL_IP = 'X-Real-IP'
export const MOBILE = 'mobile'
export const BROWSER = 'browser'
export const API_REQUEST_ACTION = 'API_REQUEST_ACTION'

export const SEND_MAIL = 'SEND_MAIL'


export const SERVER_POST_URL = '/api/post_request'

/** Роутер */
export const CHANGE_ROUTE = '@@router/LOCATION_CHANGE'
export const TOUCH_LOCATION = 'TOUCH_LOCATION'
/** Поиск */
export const SEARCH_EVENT = 'SEARCH_EVENT'
/** Вход пользователя*/
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
/** Категории */
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_AUTO_COMPLETE = 'SET_AUTO_COMPLETE'
/** Диалог c ЕРИП */
export const DIALOG = 'DIALOG'
/** Локации */
export const SET_LOCATION = 'SET_LOCATION'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'
/** История платежей */
export const SET_HISTORY_ITEMS = 'SET_HISTORY_ITEMS'
export const SET_HISTORY_LIST = 'SET_HISTORY_LIST'
/** Настройки */
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const SET_PROFILE = 'SET_PROFILE'
export const USER_AGREEMENT = 'USER_AGREEMENT'
export const TOTAL_LOGOUT = 'LOGOUT_ALL_DEVICES'
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
export const SETTINGS_FIELDS_ERROR = 'SETTINGS_FIELDS_ERROR'
/** Правила сервиса*/
export const SERVICE_DESCRIPTION = 'SERVICE_DESCRIPTION'

/** Мои счета */
export const GET_BANNERS = 'GET_BANNERS'
export const CREATE_USER_DATA_WITH_BANNER = 'CREATE_USER_DATA_WITH_BANNER'
export const CREATE_USER_DATA = 'CREATE_USER_DATA'
export const GET_USER_DATA = 'GET_USER_DATA'
export const USER_DATA_SEARCH = 'USER_DATA_SEARCH'
export const FOCUS_SERVICE = 'FOCUS_SERVICE'
export const DELETE_USER_DATA = 'DELETE_USER_DATA'
export const EDIT_USER_DATA = 'EDIT_USER_DATA'

/** флаги */
export const ACCOUNTS_SLIDER_LOADED = 0b00001
export const ACCOUNTS_USER_DATA_LOADED = 0b00010