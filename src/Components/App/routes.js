import Error from '../Pages/Error/Error';
import {getCategories} from '../../Reducers/Requests/categoriesRequest'
import {Categories} from "../Pages/Categories"
import {Main} from "../Pages/Main"
import {loadCategories} from "../../Reducers/AC/categoriesAC"

export default [
    {
        path: '/',
        exact: true,
        component: Categories,
        title: 'Главная страница',
    },
    {
        path: '/categories/:id',
        exact: true,
        component: Categories,
        title: 'Категории',
        fetchData: getCategories
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    },
];


