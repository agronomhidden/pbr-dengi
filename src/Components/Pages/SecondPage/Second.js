import React from 'react';
import PageComponent from '../../App/PageComponent';
import PageLayout from "../../Decorators/PageLayout"
import {LeftAside , RightAside} from '../Aside'



class Second extends PageComponent {

    render = () => <h1 className="header">Welcome!</h1>

}

export default PageLayout(LeftAside, Second, RightAside);