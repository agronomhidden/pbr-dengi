import React from 'react'
import PageComponent from '../App/PageComponent'
import PropTypes from 'prop-types'
import {queryStringToState} from 'pbr-lib-front-utils/dist/queryStringHelper'


export default (Component) => class PageDataLoader extends PageComponent {

    static propTypes = {
        entitiesLoader: PropTypes.func.isRequired,
        entities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        searchFunc: PropTypes.func,
        loading: PropTypes.bool
    }

    componentDidMount() {
        const {loading, history, entities} = this.props;
        if (!loading && (history.location.state || !entities.length)) {
            this.props.history.location.state = '';
            this._getEntities(this.props)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && this.props.history.location.state) {
            this.props.history.location.state = '';
            this._getEntities(nextProps)
        }
    }

    _getEntities(props) {
        if (this.isBrowser()) {
            const {entitiesLoader, searchFunc, history: {push, location}, match: {params}} = props;

            const search = queryStringToState(location && location.search)

            if (Object.keys(search).length) {
                params['searchQuery'] = search.searchQuery
                search.searchQuery ? searchFunc(params) : push('/not-found')
            } else {
                entitiesLoader(params);
            }
        }
    }

    render = () => <Component {...this.props}/>
}
