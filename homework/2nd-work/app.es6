import Koa from 'koa';
import  router from 'koa-simple-router';
import render from 'koa-swig';
import co from 'co';
const serve = require('koa-static');

import InitController from './controller/initController';
import CONFIG from './config/config';

const app = new Koa();

InitController.init(app,router);

app.context.render = co.wrap(render({
    root: CONFIG.get('viewDir'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
}));
app.use(serve(CONFIG.get('staticDir')));
app.listen(CONFIG.get('port'));
