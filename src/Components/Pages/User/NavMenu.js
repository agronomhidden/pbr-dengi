import React, {Component} from 'react';
import propTypes from 'prop-types';
import {NavLink} from 'react-router-dom';


export default class NavMenu extends Component {

    render = () =>
            <div>
                <div className='nav-link'><NavLink to='/settings'>Настройки</NavLink></div>
                <div className='nav-link'><NavLink to='/payments-history'>История платежей</NavLink></div>
            </div>
}