import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import morgan from 'morgan'
import React from 'react'
import manifest from '../public/assets/manifest'
import Layout from './layout'
import Router from './Components/App/ServerRouter'
import Config from 'pbr-lib-front-utils/dist/config'

const app = express();
const mode = (process.env.NODE_ENV && process.env.NODE_ENV.replace(/[^A-Z]/ig, '')) || 'production';
const PORT = process.env.PORT || (mode === 'production' ? 3333 : 3003);

let appConf = new Config('./config/', mode);
appConf.exportToGlobalEnv();

Layout.setManifest(manifest);
if (mode === 'production') {
    Layout.setProdMode();
}

app.use(cookieParser());

app.use(morgan('combined'));

// Сжимаем файлы
app.use(compress());

// Настраиваем путь для статичных файлов:
app.use(express.static('public', {
    maxage: '1Y',
}));

app.use('/', Router);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
