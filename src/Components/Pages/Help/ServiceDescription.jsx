import React from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types'

import PageLayout from "../../Decorators/PageLayout"
import PageComponent from "../../App/PageComponent"
import {getDescription} from "../../../Reducers/AC/helpAC"


export class ServiceDescription extends PageComponent {

    static propTypes = {
        data: PropTypes.object,
        loading: PropTypes.bool.isRequired,
    }

    render() {
        const {loading, loaded, data: description} = this.props;

        if (loading || !loaded) {
            return <div>Загрузка</div>
        }

        return <article>
            <h3>{description.get('title')}</h3>
            {this.isBrowser() && <p dangerouslySetInnerHTML={{__html: description.get('text')}}/>}
        </article>
    }
}

export default connect(
    (s =>
            ({
                data: s.help.get('description'),
                loading: s.help.get('loading'),
                loaded: s.help.get('loaded'),
            })
    ), {dataLoader: getDescription}
)(PageLayout(ServiceDescription))