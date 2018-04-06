import {getUserAgreement} from "../../../Reducers/AC/helpAC"
import {connect} from "react-redux"
import Document from './Document';

export default connect(
    ({help}) => ({
        data: help.get('agreement'),
        loading: help.get('loading'),
        loaded: help.get('UALoaded')
    }), {dataLoader: getUserAgreement}
)(Document)

