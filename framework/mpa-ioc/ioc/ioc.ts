
import { fluentProvide, provide, buildProviderModule } from "inversify-binding-decorators";
import * as Router from "koa-router";
import { controller, interfaces, TYPE, InversifyKoaServer } from 'inversify-koa-utils';
import { inject } from 'inversify';
import { httpGet } from 'inversify-koa-utils';

let provideController = function (identifer, name) {
    return fluentProvide(identifer).whenTargetNamed(name).done();
}
export {
    provide, Router, controller, interfaces, inject, httpGet, buildProviderModule, provideController, TYPE, InversifyKoaServer
}