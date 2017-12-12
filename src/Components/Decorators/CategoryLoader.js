import React from 'react';
import PageComponent from '../App/PageComponent';
import PropTypes from 'prop-types';
import {queryStringToState} from '../../Utils/helper'

export default (Component) => class CategoryLoader extends PageComponent {

    static propTypes = {
        entitiesLoader: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.getEntities(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location !== nextProps.history.location){
            this.getEntities(nextProps)
        }
    }

    getEntities(props) {
        if (this.isBrowser()) {
            const {entitiesLoader} = this.props;
            const params = queryStringToState()
            params['id'] = props.match.params.id ? props.match.params.id : null;
            console.log(params);
            entitiesLoader && entitiesLoader(params);
        }
    }

    render() {
        return (
            <Component {...this.props} />
        );
    }
}
