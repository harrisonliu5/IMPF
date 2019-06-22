import Koa from 'koa';
import  routesInt from './routes/index';
import config from './config/index';
import  router from 'koa-simple-router';
import errorPage from './middleware/errorPage';
import log4js from 'log4js';
import serve from 'koa-static' ;
import render from 'koa-swig';
import co from 'co';
const app = new Koa();

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody:false
}));

log4js.configure({
    appenders: { cheese: { type: 'file', filename: __dirname+'/logs/cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');
errorPage.init(app, logger);
routesInt.init(app, router);
app.use(serve(config.staticDir));
app.listen(config.port,()=>{
    console.log(`listing on ${config.port}`);
});
