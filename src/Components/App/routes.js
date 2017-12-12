import Error from '../Pages/Error/Error';
//import {getCategories} from '../../Reducers/Requests/categoriesRequest'
import {Categories,CurrentCategories} from "../Pages/Categories"


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
        component: CurrentCategories,
        title: 'Категории',
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    },
];


