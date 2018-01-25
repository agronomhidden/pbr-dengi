import React, {Component} from 'react';
import PropTypes from "prop-types"

export default class Input extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string.isRequired,
        min: PropTypes.number,
        max: PropTypes.number,
        step:PropTypes.number,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    }

    render = ()  => <input {...this.props}/>

}
