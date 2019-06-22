"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

let config = {
  env: process.env.NODE_ENV,
  staticDir: (0, _path.join)(__dirname, "..", "assets"),
  viewDir: (0, _path.join)(__dirname, "..", "views")
};

if (process.env.NODE_ENV == 'development') {
  const devConfig = {
    port: 8081
  };
  config = Object.assign(config, devConfig);
}

if (process.env.NODE_ENV == 'production') {
  const proConfig = {
    port: 80
  };
  config = Object.assign(config, proConfig);
}

exports.default = config;