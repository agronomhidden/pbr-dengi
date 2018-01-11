require('babel-core/register');
require('babel-polyfill');

//APP entry point
const extendRequire = require("isomorphic-loader/lib/extend-require");

['.css', '.styl', '.ttf', '.woff', '.woff2','.ico'].forEach((ext) => require.extensions[ext] = () => {});

extendRequire().then(()=> {
    require("./src/server");
}).catch((err)=> {
    console.log(err);
});

