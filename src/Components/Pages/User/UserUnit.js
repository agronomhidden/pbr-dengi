import React from 'react';
import {UserInfo, NavMenu} from './index';
import  './UserUnit.styl';

export const UserUnit = ({user}) => [<UserInfo key={1} user={user}/>, <NavMenu key={2}/>]

