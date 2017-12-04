import React, {Component} from 'react';
import propTypes from 'prop-types';



export default class UserInfo extends Component {

    static propTypes = {
        user: propTypes.object.isRequired
    }

    render = () => {
        const {user} = this.props;
        return (
            <div>
                <h2>Здравствуйте!</h2>
                <h2>{`${user.get('first_name')} ${user.get('last_name')}`}</h2>
                <h2>{`${user.get('phone')}`}</h2>
            </div>
        )
    }


}
