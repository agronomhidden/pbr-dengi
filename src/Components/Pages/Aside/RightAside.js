import React, {Component} from 'react';
import {connect} from 'react-redux';

class RightAside extends Component {

    render = () =>
        <aside className="left-aside">
            Контент справа
        </aside>

}

export default connect(
    null
)(RightAside);
