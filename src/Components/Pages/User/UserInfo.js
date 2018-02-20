import React, {Component} from 'react';
import propTypes from 'prop-types';


export default class UserInfo extends Component {

    static propTypes = {
        user: propTypes.object.isRequired
    }

    render = () =>
        <div>
            <h2>Здравствуйте!</h2>
            <h2>{`${this.props.user.first_name} ${this.props.user.patronymic} ${this.props.user.last_name}`}</h2>
            <h2>{this.props.user.phone}</h2>
        </div>

}
