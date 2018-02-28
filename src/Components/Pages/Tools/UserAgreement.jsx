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
    
    componentWillMount(){
        console.log(this.props.data);
    }
    
    render = () => this.isBrowser() && this.props.data &&
        <article>
            <h3>{this.props.data.title}</h3>
            <p dangerouslySetInnerHTML={{__html: this.props.data.text}}/>
        </article> || <div/>
}

export default connect(
    (s => (
        {
            data: s.settings.get('agreement'),
            loading: s.settings.get('UALoading'),
        }
    )), {dataLoader: getUserAgreement}
)(UserAgreement)