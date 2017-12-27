import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {setStateOfProps} from "../../../Utils/helper"
import {DialogFormGroup} from "./index"

export default class DialogBlock extends Component {


    static propTypes = {
        _setFieldsState: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        fields: PropTypes.array.isRequired
    }

    componentWillMount() {
        this.setState(setStateOfProps(this.props.fields, 'name'))

    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value})
        this.props._setFieldsState(this.state);
    }

    _onCheck = ({target: {name, checked}}) => {
        this.setState({
            [name]: Number(checked)
        });
        this.props._setFieldsState(this.state);
    };

    render = () => (
        <div>
            {this.props.fields.map((fieldProps, i) => {
                const fields = fieldProps.toObject();
                return <DialogFormGroup key={i}
                                        {...fields}
                                        onChange={this._onChange}
                                        onCheck={this._onCheck}
                                        value={this.state[fields.name]}
                                        loading={this.props.loading}/>
            })}
            <div className='help'>{this.props.summary}</div>
        </div>)
}




