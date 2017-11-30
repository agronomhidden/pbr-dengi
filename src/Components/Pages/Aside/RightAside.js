import React, {Component} from 'react';
import {connect} from 'react-redux';

class RightAside extends Component {

    render = () =>
        <aside className="left-aside">
            {this.props.message && this.props.message}
        </aside>

}

export default connect(
    (s => ({
        message: s.messenger.get('message'),
    }))
)(RightAside);
