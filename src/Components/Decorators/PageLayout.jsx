import React from 'react';
import {LeftAside, RightAside} from '../Pages/Aside'
import {Location} from "../Pages/Partials/index"

export default (Component) => (props) =>
    <div>
        <header className="header"><Location/></header>
        <div className="main_wrap">
            <LeftAside/>
            <RightAside>
                <Component {...props} />
            </RightAside>
        </div>
    </div>

