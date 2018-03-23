import React from 'react'
import {connect} from "react-redux"

import PropTypes from 'prop-types';
import {getUserAgreement} from "../../../Reducers/AC/settingsAC"
import PageComponent from "../../App/PageComponent"


export class UserAgreement extends PageComponent {

    static propTypes = {
        data: PropTypes.object,
        loading: PropTypes.bool.isRequired,
    }

    render() {
        const {loading, loaded, data: agreement} = this.props;

        if (loading || !loaded) {
            return <div>Загрузка</div>
        }

        return <article>
            <h3>{agreement.get('title')}</h3>
            {this.isBrowser() && <p dangerouslySetInnerHTML={{__html: agreement.get('text')}}/>}
        </article>
    }
}

export default connect(
    (s => (
        {
            data: s.settings.get('agreement'),
            loading: s.settings.get('UALoading'),
            loaded: s.settings.get('UALoaded'),
        }
    )), {dataLoader: getUserAgreement}
)(UserAgreement)