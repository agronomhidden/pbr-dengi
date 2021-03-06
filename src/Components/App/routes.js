import Error from '../Pages/Error/Error';
import {Categories, CurrentCategories} from "../Pages/Categories"
import Accounts from '../Pages/Accounts'
import {Payments, RechargeDialog} from "../Pages/Payments"
import Tools from "../Pages/Tools/Tools"
import {RechargeInfo} from '../Pages/Assist'
import {fetchCategories} from "../../Reducers/AC/categoriesAC"
import {getHistoryItems, getHistoryList} from "../../Reducers/AC/payHistoryAC"
import {getUserAgreement} from "../../Reducers/AC/helpAC"
import {getFavorites} from "../../Reducers/AC/favoritesAC"
import ServiceDescription from "../Pages/Help/ServiceDescription"
import UserAgreementInTempl from "../Pages/Help/UserAgreementInTempl"
import {getDescription, getSocial} from "../../Reducers/AC/helpAC"
import {History, HistoryDetailItem} from "../Pages/History"
import {Favorites, Favorite} from "../Pages/Favorites"
import {loadBanners, loadUserData, loadInvoices} from '../../Reducers/AC/accountsAC'
import {initDialog} from '../../Reducers/AC/eripDialogAC'
import {getRechargeInfo} from "../../Reducers/AC/assistAC"
import {PayInvoices} from "../Pages/Invoices"
import {RechargePhone} from "../Pages/Assist"
import {getRechargeModel} from "../../Reducers/AC/payIvoicesAC"
import Social from "../Pages/Help/Social"

export default [
    {
        path: ['/', '/\?(.+)'],
        exact: true,
        component: Categories,
        title: 'Главная страница',
        onRouteChangeFetch: fetchCategories,
        fetchData: fetchCategories
    },
    {
        path: ['/categories/:id(\\d+)', '/categories/:id(\\d+)\?(.+)'],
        exact: true,
        component: CurrentCategories,
        title: 'Категории',
        onRouteChangeFetch: fetchCategories,
        fetchData: fetchCategories
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
        path: '/payments/:id(\\d{11})',
        exact: true,
        component: Payments,
        onInitFetch: initDialog,
        onRouteChangeFetch: initDialog,
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
        component: UserAgreementInTempl,
        title: 'Пользовательское соглашение',
        fetchData: getUserAgreement
    },
    {
        path: '/help/social',
        exact: true,
        component: Social,
        fetchData: getSocial
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
        path: ['/accounts/edit/:div_id(\\d+)/:user_data_id(\\d+)', '/accounts/:parent_id(\\d+)\?/:search(.*)', '/accounts'],
        exact: true,
        needAuth: true,
        component: Accounts,
        title: 'Мои счета',
        onRouteChangeFetch: [loadBanners, loadUserData, loadInvoices],
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
        path: '/recharge-dialog',
        exact: true,
        needAuth: true,
        component: RechargeDialog,
        title: 'Оплата услуги',
    },
    {
        path: '/recharge-ok*',
        needAuth: true,
        component: RechargeInfo,
        title: 'Результат платежа',
        fetchData: getRechargeInfo
    },
    {
        path: '/recharge-no*',
        exact: true,
        needAuth: true,
        component: RechargeInfo,
        title: 'Результат платежа',
        fetchData: params => getRechargeInfo(params, false)
    },
    {
        path: '/pay-invoices/:transaction_uuids',
        exact: true,
        needAuth: true,
        component: PayInvoices,
        title: 'Оплата счета',
        fetchData: loadInvoices
    },
    {
        path: '/recharge-phone*',
        exact: true,
        needAuth: true,
        component: RechargePhone,
        title: 'Пополнение баланса мобильного телефона',
        fetchData: getRechargeModel
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    }
];
