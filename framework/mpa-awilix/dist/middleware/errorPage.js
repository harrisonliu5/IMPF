"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const errorPage = {
  init(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        logger.error(error);
        ctx.status = error.status || 500;
        ctx.body = "网站挂掉了";
      }
    });
    app.use(async (ctx, next) => {
      await next();

      if (ctx.status == 404) {
        ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>';
        logger.error('出错了');
      }
    });
  }

};
exports.default = errorPage;