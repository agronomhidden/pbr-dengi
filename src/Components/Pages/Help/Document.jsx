import React from 'react';

import PropTypes from 'prop-types'
import PageComponent from "../../App/PageComponent"
import {Roller} from "../../Loading"

export default class Document extends PageComponent {

    static propTypes = {
        data: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
    }

    render() {
        const {loading, loaded, data: document} = this.props;

        if (loading || !loaded) {
            return <Roller width="50px"/>
        }

        return <article>
            <h3>{document.get('title')}</h3>
            {this.isBrowser() && <p dangerouslySetInnerHTML={{__html: document.get('text')}}/>}
        </article>
    }
}