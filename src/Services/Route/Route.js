
export default class Route {

    data = null

    constructor(route) {
        this.data = route;
    }

    /**
     * @return {boolean}
     */
    isAuthNeeded() {
        return !!this.data.route.needAuth
    }

    getFetchFunctions() {
        return this.data.route.fetchData || [];
    }

    getParams() {
        return this.data.match.params || {};
    }

    /**
     * @param {Array} closures
     * @return {*}
     */
    *executeFetchActions(closures = []) {
        const fetchData = this.getFetchFunctions();

        if (fetchData instanceof Function) {
            yield fetchData(closures.reduce((result, closure) => closure(result), this.getParams()))
        }
        if (fetchData instanceof Array) {
            for (let fetchFunction of fetchData) {
                if (fetchFunction instanceof Function) {
                    yield fetchFunction(closures.reduce((result, closure) => closure(result), this.getParams()))
                }
            }
        }
    }
}

//{route: {
//  path: '/categories/:id(\\d+)',
//  exact: true,
//  component: [Object],
//  title: 'Категории',
//  fetchData: [Function: fetchCategories]
// },
// match: {
//  path: '/categories/:id(\\d+)',
//  url: '/categories/1',
//  isExact: true,
//  params: [Object]
// }
//}