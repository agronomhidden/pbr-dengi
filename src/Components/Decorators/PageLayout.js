import React, {Component} from 'react'

export default (LeftAside, PageComponent, RightAside) => class PageLayout extends Component {
    render() {
        return (
            <div className="main_wrap">
                {LeftAside && <LeftAside/>}
                <PageComponent {...this.props} />
                {RightAside && <RightAside/>}
            </div>
        );
    }
}
