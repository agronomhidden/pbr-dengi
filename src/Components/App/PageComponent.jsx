import React, {Component} from 'react';

export default class PageComponent extends Component {

    constructor(props) {
        super(props);
        this.title = props.route && props.route.title || '';
        if (this.isBrowser()) {
            const {createBrowserHistory} = require('history');
            this.history = createBrowserHistory;
        }
        props.staticContext && props.staticContext.pageTitleSetter(this.title);
    }

    isBrowser() {
        return typeof document !== 'undefined';
    }

    setTitle(title) {
        this.title = title;
        if (this.isBrowser() && title) {
            document.title = title;
        }
    }

    appendTitle(title) {
        this.title += ' | ' + title;
    }

    componentWillMount() {
        if (this.isBrowser() && this.title) {
            document.title = this.title;
        }
    }

    componentDidMount() {
        if (this.isBrowser() && this.props.dataLoader && (!this.props.data || !this.props.data.length)) {
            this.props.dataLoader()
        }
    }
}
