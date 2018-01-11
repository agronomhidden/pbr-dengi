//APP entry point
const extendRequire = require("isomorphic-loader/lib/extend-require");
require('babel-core/register');

['.css', '.styl', '.ttf', '.woff', '.woff2','.ico'].forEach((ext) => require.extensions[ext] = () => {});

require('babel-polyfill');

extendRequire().then(()=> {
    require("./src/server");
}).catch((err)=> {
    console.log(err);
});

