import React, {Component} from 'react';
import propTypes from 'prop-types';
import {UserInfo, NavMenu} from './';


export default class UserUnit extends Component {

    static propTypes = {
        user: propTypes.object.isRequired
    }

    render = () => {
        return (
            <div>
                <UserInfo user={this.props.user}/>
                <NavMenu/>
            </div>
        )
    }


}
