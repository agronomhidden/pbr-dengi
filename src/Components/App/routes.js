import Home from '../Pages/Home';
import {RightAside} from '../Pages/Aside';
import Error from './Error';
import {setMess, loadMess} from '../../Reducers/Requests/loadMessage'

export default [
    {
        path: '/(/?/*)?',
        exact: true,
        component: Home,
        title: 'Главная страница'
    },
    {
        path: '/home(/?/*)?',
        exact: true,
        component: Home,
        title: 'Главная страница',
        needAuth:true,
        fetchData: [loadMess, setMess],
    },
    {
        path: '/home/:id',
        exact: true,
        component: RightAside,
        title: 'Правая часть',
        fetchData: [setMess],
    },
    {
        path: '*',
        component: Error,
        needAuth: true,
        title: 'Ошибка 404. Страница не найдена',
    },
];


