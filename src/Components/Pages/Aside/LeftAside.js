import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from '../Login';
import {UserInfo} from '../User';

class LeftAside extends Component {

    render = () =>
        <aside className="left-aside">
            {!this.props.user ? <Login/> : <UserInfo user={this.props.user}/>}
        </aside>

}

export default connect(
    (s => ({
        user: s.auth.get('user'),
    }))
)(LeftAside);
