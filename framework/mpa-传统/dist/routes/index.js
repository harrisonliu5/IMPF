"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IndexController = require("./IndexController");

var _IndexController2 = _interopRequireDefault(_IndexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routesInit = {
  init(app, router) {
    app.use(router(_ => {
      _.get('/', _IndexController2.default.indexAction());

      _.get('/index/test', _IndexController2.default.testAction());
    }));
  }

};
exports.default = routesInit;