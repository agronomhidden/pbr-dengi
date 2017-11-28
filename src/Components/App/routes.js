import Home from '../Pages/Home';
import Error from './Error';


export default  [
    {
        path: '/',
        exact: true,
        component: Home,
        title: 'Главная страница',
        fetchData: []
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    },
];
