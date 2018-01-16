import React, {Component} from 'react';
import DatePicker from 'react-date-picker'
import PropTypes from 'prop-types';

export default class SimpleDatePicker extends Component {

    static propTypes = {
        value: PropTypes.instanceOf(Date),
        name: PropTypes.string.isRequired,
        required: PropTypes.bool,
        view: PropTypes.string

    }

    onChange = date => {
        this.props.onChange({target: {name: this.props.name, value: date}})
    }

    render = () => <DatePicker
        onChange={this.onChange}
        value={this.props.value}/>

}


