import Error from '../Pages/Error/Error';
import {Categories, CurrentCategories} from "../Pages/Categories"
import {Payments} from "../Pages/Payments"
import {categoriesSearch, getCategories} from "../../Reducers/Requests/categoriesRequest"
import {initDialog} from "../../Reducers/Requests/eripDialogRequest"


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


