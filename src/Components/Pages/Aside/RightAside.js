import React, {Component} from 'react';
import {connect} from 'react-redux';

class RightAside extends Component {

    render = () =>
        <aside className="left-aside">
            <h2 style={{color:'#223144'}}>{this.props.message && this.props.message}</h2>
        </aside>

}

export default connect(
    (s => ({
        message: s.messenger.get('message'),
    }))
)(RightAside);
