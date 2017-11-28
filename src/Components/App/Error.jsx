import React from 'react';
import PageComponent from './PageComponent';

class Error extends PageComponent {

    constructor(props) {
        super(props);
        props.staticContext && props.staticContext.setNotFound && props.staticContext.setNotFound();
    }

    render() {
        return (
            <div>
                Ошибка 404!
            </div>
        );
    }
}

export default Error;
