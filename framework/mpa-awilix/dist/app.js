"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _index = require("./config/index");

var _index2 = _interopRequireDefault(_index);

var _errorPage = require("./middleware/errorPage");

var _errorPage2 = _interopRequireDefault(_errorPage);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default(); //创建一个新的容器

const container = (0, _awilix.createContainer)(); // 请求每一次告诉容器

app.use((0, _awilixKoa.scopePerRequest)(container)); //装在所有的service到容器里

container.loadModules([__dirname + '/services/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
});
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _index2.default.viewDir,
  autoescape: true,
  cache: 'memory',
  // disable, set to false
  ext: 'html',
  writeBody: false
}));

_log4js2.default.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: __dirname + '/logs/cheese.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
}); // const logger = log4js.getLogger('cheese');
// errorPage.init(app, logger);
//自动化加载router;


app.use((0, _awilixKoa.loadControllers)(__dirname + '/routes/*.js'), {
  cwd: __dirname
});
app.use((0, _koaStatic2.default)(_index2.default.staticDir));
app.listen(_index2.default.port, () => {
  console.log(`listing on ${_index2.default.port}`);
});