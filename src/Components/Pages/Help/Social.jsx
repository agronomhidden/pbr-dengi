import {connect} from "react-redux"
import Document from './Document'

import PageLayout from "../../Decorators/PageLayout"
import {getSocial} from "../../../Reducers/AC/helpAC"

export default connect(
    ({help}) => ({
        data: help.get('social'),
        loading: help.get('loading'),
        loaded: help.get('SRLoaded'),
    }), {dataLoader: getSocial}
)(PageLayout(Document))