import React, {Component} from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types'

import PageLayout from "../../Decorators/PageLayout"
import PageComponent from "../../App/PageComponent"
import {getDescription} from "../../../Reducers/AC/helpAC"


export class ServiceDescription extends PageComponent {

    static propTypes = {
        description: PropTypes.object,
        loading: PropTypes.bool.isRequired,
    }

    render = () => this.isBrowser() && this.props.data &&
        <article>
            <h3>{this.props.data.title}</h3>
            <p dangerouslySetInnerHTML={{__html: this.props.data.text}}/>
        </article> || <div/>
}

export default connect(
    (s =>
            ({
                data: s.help.get('description'),
                loading: s.help.get('loading'),
            })
    ), {dataLoader: getDescription}
)(PageLayout(ServiceDescription))