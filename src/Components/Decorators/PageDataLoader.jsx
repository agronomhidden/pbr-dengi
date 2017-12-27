import React from 'react'
import PageComponent from '../App/PageComponent'
import PropTypes from 'prop-types'
import {queryStringToState} from '../../Utils/helper'

export default (Component) => class PageDataLoader extends PageComponent {

    static propTypes = {
        entitiesLoader: PropTypes.func.isRequired,
        searchFunc: PropTypes.func,
        loading: PropTypes.bool
    }

    componentWillMount() {
        // console.log(this.props.entitiesLoader);
        if (!this.props.loading && this.props.history.location.state) {
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
            const {entitiesLoader, searchFunc, history: {push}, match: {params}} = props;

            const search = queryStringToState(this.props.history.location)

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
