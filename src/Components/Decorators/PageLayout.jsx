import React from 'react';
import {LeftAside, RightAside} from '../Pages/Aside'

export default (Component) => (props) =>
    <div className="main_wrap">
        <LeftAside/>
        <RightAside>
            <Component {...props} />
        </RightAside>
    </div>

