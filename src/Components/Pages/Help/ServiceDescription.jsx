import React, {Component} from 'react'
import {connect} from "react-redux"

import PropTypes from 'prop-types';
import {getDescription} from "../../../Reducers/Requests/helpRequest"
import PageLayout from "../../Decorators/PageLayout"
import PageComponent from "../../App/PageComponent"


export class ServiceDescription extends PageComponent {

    static propTypes = {
        description: PropTypes.object,
        loading: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        !this.props.description && this.props.getDescription()
    }

    render = () => this.isBrowser() && this.props.description &&
        <article>
            <h3>{this.props.description.title}</h3>
            <p dangerouslySetInnerHTML={{__html: this.props.description.text}}/>
        </article> || <div/>
}

export default connect(
    (s => (
        {
            description: s.help.get('description'),
            loading: s.help.get('loading'),
        }
    )), {getDescription}
)(PageLayout(ServiceDescription))