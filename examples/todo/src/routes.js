import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import About from './components/About';
import ViewerQueries from './queries/ViewerQueries';

export default [
    {
        path: '/a',
        component: About,
    },
    {
        path: '/',
        component: TodoApp,
        queries: ViewerQueries,
        indexRoute: {
            component: TodoList,
            queries: ViewerQueries,
            prepareParams: () => ({status: 'any'}),
        },
        childRoutes: [
            {
                path: ':status',
                component: TodoList,
                queries: ViewerQueries,
            },

        ],
    },

];
