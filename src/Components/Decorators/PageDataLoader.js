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
        if (!this.props.loading) {
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
            const search = queryStringToState()
            console.log(params);
            const id = params ? params.id : null;
            if (Object.keys(search).length) {
                search.searchQuery ? searchFunc(search.searchQuery, id) : push('/not-found')
            } else {
                entitiesLoader(id);
            }
        }
    }

    render = () => <Component {...this.props}/>
}
