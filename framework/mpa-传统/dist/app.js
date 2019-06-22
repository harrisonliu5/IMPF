"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _index = require("./routes/index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./config/index");

var _index4 = _interopRequireDefault(_index3);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _errorPage = require("./middleware/errorPage");

var _errorPage2 = _interopRequireDefault(_errorPage);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _index4.default.viewDir,
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
});

const logger = _log4js2.default.getLogger('cheese');

_errorPage2.default.init(app, logger);

_index2.default.init(app, _koaSimpleRouter2.default);

app.use((0, _koaStatic2.default)(_index4.default.staticDir));
app.listen(_index4.default.port, () => {
  console.log(`listing on ${_index4.default.port}`);
});