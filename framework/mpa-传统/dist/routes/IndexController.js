"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IndexModel = require("../models/IndexModel");

var _IndexModel2 = _interopRequireDefault(_IndexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IndexController = {
  indexAction() {
    return async (ctx, next) => {
      const indexModel = new _IndexModel2.default();
      const result = await indexModel.getData(); // ctx.body = await ctx.render('index', { data: result });

      ctx.body = "action";
    };
  },

  testAction() {
    return async (ctx, next) => {
      ctx.body = await ctx.render('index/test.html');
    };
  }

};
exports.default = IndexController;