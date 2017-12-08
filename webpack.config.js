global.Promise = require('bluebird')

const mode = process.env.NODE_ENV && process.env.NODE_ENV.replace(/[^A-Z]/ig, '') || 'development'
const dotenv = require('dotenv')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin")

const publicPath = 'http://localhost:8050/public/assets'
const cssName = mode === 'production' ? 'styles-[hash].css' : 'styles.css'
const jsName = mode === 'production' ? 'bundle-[hash].js' : 'bundle.js'

const path = `./config/${mode}/.env` + (fs.existsSync(`./config/${mode}/.env.local`) && '.local');
const processVariables = dotenv.parse(fs.readFileSync(path))
processVariables['BROWSER'] = true
processVariables['NODE_ENV'] = mode

for(let k in processVariables){
    processVariables[k] = JSON.stringify(processVariables[k])
}

const plugins = [
    new webpack.DefinePlugin({
        'process.env': processVariables
    }),
    new ExtractTextPlugin(cssName),
    new webpack.LoaderOptionsPlugin({
        debug: true
    }),
    new ManifestPlugin({
        fileName: 'manifest.json'
    }),
    new IsomorphicLoaderPlugin({
        webpackDev: {
            url: false,
        }
    })
];
if (mode === 'production') {
    plugins.push(
        new CleanWebpackPlugin(['public/assets/'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = {
    entry: ['babel-polyfill', './src/client.js'],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.json', '.js', '.jsx']
    },
    plugins,
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/"
                })
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2|jpe?g|png|gif|ico|svg+xml)$/i,
                loader: "file-loader!isomorphic-loader"
            },
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/, /public/]},
            {test: /\.json$/, loader: 'json-loader'},
        ]
    },
    devtool: mode !== 'production' ? 'source-map' : false,
    devServer: {
        headers: {'Access-Control-Allow-Origin': '*'}
    }
};
