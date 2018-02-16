import React, {Component} from 'react'
import {connect} from "react-redux"

import FormGroup from "../Partials/FormGroup"
import {Button} from "../Partials"
import {setProfile} from "../../../Reducers/Requests/setingsRequest"
import PropTypes from 'prop-types';

export class SetProfile extends Component {

    static propTypes = {
        setProfile: PropTypes.func.isRequired,
        blockManagement: PropTypes.func.isRequired,
        block: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
        successMsg: PropTypes.bool
    }

    state = {
        first_name: '',
        last_name: '',
        patronymic: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        const {errors, successMsg} = nextProps
        errors && this.setState({errors})
        console.log(nextProps);
        if (successMsg) {
            this.props.blockManagement(this.props.block, successMsg)
        }
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.props.setProfile(this.state)
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    render = () =>
        <div>
            <form onSubmit={this._onSubmit}>
                <FormGroup label='Имя'  name='first_name' errors={this.state.errors}
                           value={this.state.first_name} onChange={this._onChange} disabled={this.props.loading}/>
                <FormGroup label='Фамилия'  name='last_name' errors={this.state.errors}
                           value={this.state.last_name} onChange={this._onChange} disabled={this.props.loading}/>
                <FormGroup label='Отчество'  name='patronymic' errors={this.state.errors}
                           value={this.state.patronymic} onChange={this._onChange} disabled={this.props.loading}/>
                <Button disabled={this.props.loading}>Сохранить</Button>
            </form>
        </div>
}

export default connect(
    (s => (
        {
            loading: s.settings.get('SPLoading'),
            successMsg: s.settings.get('SPSuccessMsg'),
            errors: s.settings.get('errors')
        }
    )), {setProfile}
)(SetProfile)