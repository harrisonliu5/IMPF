import {join} from 'path';
let config = {
    env: process.env.NODE_ENV,
    staticDir: join(__dirname,"..","assets"),
    viewDir: join(__dirname,"..","views"),
}

if(process.env.NODE_ENV == 'development'){
    const devConfig = {
        port: 8081
    };
    config = Object.assign(config,devConfig);
}

if(process.env.NODE_ENV == 'production'){
    const proConfig = {
        port: 80
    }
    config = Object.assign(config,proConfig);
}

export default config;