import React ,{Component} from 'react';
import {LeftAside, RightAside} from '../Pages/Aside'

export default (Component) => class PageLayout extends Component {

    render = () =>
            <div className="main_wrap">
                <LeftAside/>
                <RightAside>
                    <Component {...this.props} />
                </RightAside>
            </div>
}
