import Error from '../Pages/Error/Error';
import {Categories, CurrentCategories} from "../Pages/Categories"
import Accounts from '../Pages/Accounts'
import {Payments} from "../Pages/Payments"
import Tools from "../Pages/Tools/Tools"
import {getCategories, categoriesSearch} from "../../Reducers/AC/categoriesAC"
import {getHistoryItems, getHistoryList} from "../../Reducers/AC/payHistoryAC"
import {getUserAgreement} from "../../Reducers/AC/settingsAC"
import {getFavorites} from "../../Reducers/AC/favoritesAC"
import ServiceDescription from "../Pages/Help/ServiceDescription"
import UserAgreement from "../Pages/Help/UserAgreement"
import {getDescription} from "../../Reducers/AC/helpAC"
import {History, HistoryDetailItem} from "../Pages/History"
import {Favorites, Favorite} from "../Pages/Favorites"
import {loadBanners, loadUserData, loadInvoices} from '../../Reducers/AC/accountsAC'

export default [
    {
        path: '/',
        exact: true,
        component: Categories,
        title: 'Главная страница',
        fetchData: getCategories
    },
    {
        path: '/\?(.+)',
        exact: true,
        component: Categories,
        title: 'Главная страница',
        fetchData: categoriesSearch
    },
    {
        path: '/categories/:id(\\d+)',
        exact: true,
        component: CurrentCategories,
        title: 'Категории',
        fetchData: getCategories
    },
    {
        path: '/categories/:id?\?(.+)',
        exact: true,
        component: CurrentCategories,
        title: 'Категории',
        fetchData: categoriesSearch
    },
    {
        path: '/payments-history',
        needAuth: true,
        exact: true,
        component: History,
        title: 'История платежей',
        fetchData: getHistoryList
    },
    {
        path: '/history-items/:transaction_uuids',
        exact: true,
        component: HistoryDetailItem,
        title: 'Оплата услуги',
        fetchData: getHistoryItems
    },
    {
        path: '/payments/:id',
        exact: true,
        component: Payments,
        title: 'Платежи'
    },
    {
        path: '/help/about',
        exact: true,
        component: ServiceDescription,
        title: 'Описание сервиса',
        fetchData: getDescription
    },
    {
        path: '/help/user-agreement',
        exact: true,
        component: UserAgreement,
        title: 'Пользовательское соглашение',
        fetchData: getUserAgreement
    },
    {
        path: '/settings',
        exact: true,
        needAuth: true,
        component: Tools,
        title: 'Настройки пользователя',
        fetchData: getUserAgreement
    },
    {
        path: '/accounts/edit/:div_id(\\d+)/:user_data_id(\\d+)',
        exact: true,
        needAuth: true,
        component: Accounts,
        title: 'Мои счета',
        fetchData: [loadBanners, loadUserData, loadInvoices]
    },
    {
        path: '/accounts/:parent_id(\\d+)\?/:search(.*)',
        exact: true,
        needAuth: true,
        component: Accounts,
        title: 'Мои счета',
        fetchData: [loadBanners, loadUserData, loadInvoices]
    },
    {
        path: '/accounts',
        exact: true,
        needAuth: true,
        component: Accounts,
        title: 'Мои счета',
        fetchData: [loadBanners, loadUserData, loadInvoices]
    },
    {
        path: '/favorites',
        exact: true,
        needAuth: true,
        component: Favorites,
        title: 'Избранные платежи',
        fetchData: getFavorites
    },
    {
        path: '/favorites/:id(\\d+)',
        exact: true,
        needAuth: true,
        component: Favorite,
        title: 'Просмотр платежа',
        fetchData: getFavorites
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    }
];


