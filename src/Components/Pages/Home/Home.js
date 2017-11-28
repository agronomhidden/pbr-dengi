import React from 'react';
import PageComponent from '../../App/PageComponent';
import PageLayout from "../../Decorators/PageLayout"
import {LeftAside , RightAside} from '../Aside'



class Home extends PageComponent {

    state = {
        inp: ''
    }

    _onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render = () => <div>Hello new Up! <input onChange={this._onChange} name='inp' type="text"/>{this.state.inp}</div>

}

export default PageLayout(LeftAside, Home, RightAside);