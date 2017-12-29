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
        const state = setStateOfProps(this.props.fields, 'name')
        this.setState(state)
        this.props._setFieldsState(state)
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.props._setFieldsState(nextState);
        return true;
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value})
    }

    _onCheck = ({target: {name, checked}}) => {
        this.setState({
            [name]: Number(checked)
        });
    };

    render = () => (
        <div>
            {this.props.fields.map((fieldProps, i) => {
                const fields = fieldProps.toObject();
                return <DialogFormGroup key={i}
                                        {...fields}
                                        onChange={this._onChange}
                                        onCheck={this._onCheck}
                                        editValue={this.state[fields.name]}
                                        loading={this.props.loading}/>
            })}
            <div className='help'>{this.props.summary}</div>
        </div>)
}




