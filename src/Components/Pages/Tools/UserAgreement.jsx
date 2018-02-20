import React from 'react'
import {connect} from "react-redux"

import PropTypes from 'prop-types';
import {getUserAgreement} from "../../../Reducers/Requests/setingsRequest"
import PageComponent from "../../App/PageComponent"


export class UserAgreement extends PageComponent {

    static propTypes = {
        agreement: PropTypes.object,
        loading: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        !this.props.agreement && this.props.getUserAgreement()
    }

    render = () => this.isBrowser() && this.props.agreement &&
        <article>
            <h3>{this.props.agreement.title}</h3>
            <p dangerouslySetInnerHTML={{__html: this.props.agreement.text}}/>
        </article> || <div/>
}

export default connect(
    (s => (
        {
            agreement: s.settings.get('agreement'),
            loading: s.settings.get('UALoading'),
        }
    )), {getUserAgreement}
)(UserAgreement)