import Error from '../Pages/Error/Error';
import {Categories, CurrentCategories} from "../Pages/Categories"
import {Payments} from "../Pages/Payments"
import Tools from "../Pages/Tools/Tools"
import {getCategories, categoriesSearch} from "../../Reducers/AC/categoriesAC"
import Receipt from "../Pages/Reciept/Receipt"
import {getHistoryItem} from "../../Reducers/Requests/payHistoryRequest"
import {getUserAgreement} from "../../Reducers/Requests/setingsRequest"
import ServiceDescription from "../Pages/Help/ServiceDescription"
import UserAgreement from "../Pages/Help/UserAgreement"
import {getDescription} from "../../Reducers/AC/helpAC"


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
        path: '/history-items/:transaction_uuids',
        exact: true,
        component: Receipt,
        title: 'Квитанция об оплате',
        fetchData: getHistoryItem
    },
    {
        path: '/payments/:id(\\d+)',
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
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    }
];


