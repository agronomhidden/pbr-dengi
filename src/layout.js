import {toJSON} from 'transit-immutable-js';

const DEV_WEBPACK_SERVER = 'http://localhost:8050';

class Layout {
    isProd = false;
    title = '';
    store = null;

    setManifest(manifest) {
        this.manifest = manifest;
    }

    setStore(store) {
        this.store = store;
    }

    setProdMode() {
        this.isProd = true;
    }

    getCssFile() {
        return this.isProd ?
            `/assets/${this.manifest['main.css']}` :
            `${DEV_WEBPACK_SERVER}/public/assets/styles.css`;
    }

    getJsFile() {
        return this.isProd ?
            `/assets/${this.manifest['main.js']}` :
            `${DEV_WEBPACK_SERVER}/public/assets/bundle.js`;
    }

    setTitle(title) {
        this.title = title;
    }

    render(componentHtml) {
        const state = JSON.stringify(toJSON(this.store.getState()));
        return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${this.title}</title>
                <link rel="stylesheet" href="${this.getCssFile()}">
            </head>
            <body>
                <script type="application/javascript">
                    window.__INITIAL_STATE__ = ${state};
                </script>
                <div id="react-view">${componentHtml}</div>
                <script type="application/javascript" src="${this.getJsFile()}"></script>
            </body>
        </html>`
    }
}

const instance = new Layout();

export default instance;