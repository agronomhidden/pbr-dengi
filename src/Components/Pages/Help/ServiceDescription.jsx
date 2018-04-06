import React from 'react'
import {connect} from "react-redux"

import {getDescription} from "../../../Reducers/AC/helpAC"
import Document from './Document';
import PageLayout from "../../Decorators/PageLayout"

export default connect(
    ({help}) => ({
        data: help.get('description'),
        loading: help.get('loading'),
        loaded: help.get('SDLoaded')
    })
    , {dataLoader: getDescription}
)(PageLayout(Document))