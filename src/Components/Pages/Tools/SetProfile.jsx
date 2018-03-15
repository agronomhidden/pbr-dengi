import React, {Component} from 'react'
import {connect} from "react-redux"

import FormGroup from "../Partials/FormGroup"

import {setProfile} from "../../../Reducers/AC/settingsAC"
import PropTypes from 'prop-types';
import {updateStateFromAssoc} from "pbr-lib-front-utils/reactStateHelper"
import {UserRecord} from "../../../Reducers/entities"


export class SetProfile extends Component {


    static propTypes = {
        setProfile: PropTypes.func.isRequired,
        blockManagement: PropTypes.func.isRequired,
        block: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
        successMsg: PropTypes.string
    }

    state = {
        first_name: '',
        last_name: '',
        patronymic: '',
        errors: {}
    }

    componentWillMount() {
         this.setState(updateStateFromAssoc(this.state, this.props.user))
    }

    componentWillReceiveProps(nextProps) {
        const {errors, success} = nextProps
        errors && this.setState({errors})
        if (success) {
            const msg = 'Данные успешно обновленны'
            this.props.blockManagement(this.props.block, msg)
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
                <FormGroup label='Имя' name='first_name' errors={this.state.errors}
                           value={this.state.first_name} onChange={this._onChange} disabled={this.props.loading}/>
                <FormGroup label='Фамилия' name='last_name' errors={this.state.errors}
                           value={this.state.last_name} onChange={this._onChange} disabled={this.props.loading}/>
                <FormGroup label='Отчество' name='patronymic' errors={this.state.errors}
                           value={this.state.patronymic} onChange={this._onChange} disabled={this.props.loading}/>
                <button disabled={this.props.loading}>Сохранить</button>
            </form>
        </div>
}

export default connect(
    (s => (
        {
            user: new UserRecord(s.auth.get('user')),
            loading: s.settings.get('SPLoading'),
            success: s.settings.get('SPSuccess'),
            errors: s.settings.get('errors')
        }
    )), {setProfile}
)(SetProfile)