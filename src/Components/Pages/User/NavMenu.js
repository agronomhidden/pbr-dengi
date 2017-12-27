import React, {Component} from 'react';
import propTypes from 'prop-types';
import {NavLink} from 'react-router-dom';


export default class NavMenu extends Component {

    render = () =>
            <div>
                <NavLink to='/settings'>Настройки</NavLink>
            </div>
}