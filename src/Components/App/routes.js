import Error from '../Pages/Error/Error';
import {Categories, CurrentCategories} from "../Pages/Categories"
import {Payments} from "../Pages/Payments"
import {categoriesSearch, getCategories} from "../../Reducers/Requests/categoriesRequest"
import Receipt from "../Pages/Reciept/Receipt"
import {getHistoryItem} from "../../Reducers/Requests/payHistoryRequest"

export default [
    {
        path: '/',
        exact: true,
        component: Categories,
        title: 'Главная страница',
      //  fetchData: getCategories
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
        // fetchData: getHistoryItem
    },
    {
        path: '/payments/:id(\\d+)',
        exact: true,
        component: Payments,
        title: 'Платежи'
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    }
];


