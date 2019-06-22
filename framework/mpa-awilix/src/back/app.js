import Koa from 'koa';
import config from './config/index';
import errorPage from './middleware/errorPage';
import log4js from 'log4js';
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import serve from 'koa-static';
import render from 'koa-swig';
import co from 'co';
const app = new Koa();

//创建一个新的容器
const container = createContainer();
// 请求每一次告诉容器
app.use(scopePerRequest(container));

//装在所有的service到容器里
container.loadModules([__dirname + '/services/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
});

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));

log4js.configure({
    appenders: { cheese: { type: 'file', filename: __dirname + '/logs/cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

// const logger = log4js.getLogger('cheese');
// errorPage.init(app, logger);
//自动化加载router;
app.use(loadControllers(__dirname+'/routes/*.js'),{ cwd: __dirname });
app.use(serve(config.staticDir));
app.listen(config.port, () => {
    console.log(`listing on ${config.port}`);
});
