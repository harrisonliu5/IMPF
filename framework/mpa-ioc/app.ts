import "reflect-metadata";
import { buildProviderModule, InversifyKoaServer} from './ioc/ioc';
import * as bodyParser from 'koa-bodyparser';
import  { Container } from 'inversify';
import './ioc/loader';

let container = new Container();
container.load(buildProviderModule());

let server = new InversifyKoaServer(container);

server.setConfig(app => {
    app.use(bodyParser());
});

let app = server.build();
app.listen(3000);