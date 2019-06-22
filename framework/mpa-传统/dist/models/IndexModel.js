"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @fileOverview 实现index的数据模型
 * @author harrison
*/

/**
 * 获取数据结构
 * @class IndexModal
 */
class IndexModal {
  /**
   * @memberof IndexModal
   * @param {string} app koa的上下文 
   */
  constructor(app) {
    this.app = app;
  }
  /**
   *获取具体API的数据
   * @returns {Promise}返回异步处理结果
   * @memberof IndexModal
   * @example 
   * return getData()
   * getData()
   */


  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello word");
      }, 1000);
    });
  }

}

exports.default = IndexModal;