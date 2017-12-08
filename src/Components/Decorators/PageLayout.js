import React from 'react';
import {LeftAside, RightAside} from '../Pages/Aside'
import PageComponent from '../App/PageComponent';
import PropTypes from 'prop-types';
import {queryStringToState} from '../../Utils/helper'

export default (Component) => class PageLayout extends PageComponent {

    static propTypes = {
        entitiesLoader: PropTypes.func
    }

    componentWillMount(){
        if(this.isBrowser()) {
            const {entitiesLoader} = this.props;
            const params = queryStringToState(location.search)
            params['id'] = this.props.match ? this.props.match.params.id : null;
            entitiesLoader && entitiesLoader(params);
        }
    }

    render() {
        return (
            <div className="main_wrap">
                <LeftAside/>
                <RightAside>
                    <Component {...this.props} />
                </RightAside>
            </div>
        );
    }
}
