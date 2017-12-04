import React from 'react';
import PageComponent from '../../App/PageComponent';
import PageLayout from "../../Decorators/PageLayout"
import {LeftAside , RightAside} from '../Aside'



class Home extends PageComponent {

    render = () => <h1 className="header">This is Home Page</h1>

}

export default PageLayout(LeftAside, Home, RightAside);