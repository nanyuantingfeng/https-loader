# https-loader

> a webpack loader for loading http(s) resources

[![Build Status](https://travis-ci.org/nanyuantingfeng/https-loader.svg?branch=master)](https://travis-ci.org/nanyuantingfeng/https-loader)
[![Coverage Status](https://coveralls.io/repos/github/nanyuantingfeng/https-loader/badge.svg?branch=master)](https://coveralls.io/github/nanyuantingfeng/https-loader?branch=master)
[![GitHub repo size](https://img.shields.io/github/repo-size/nanyuantingfeng/https-loader)](https://img.shields.io/github/repo-size/nanyuantingfeng/https-loader)

#### Getting Started

```shell
npm install --save-dev https-loader
```

#### Usage

1. use as prefix to the require statement.

   // demo.http

   ```
   https://xxx.yyy.zzz/.../demo.min.js
   ```

   // other.js

   ```js
   const demo = require('https-loader!./demo.http');
   ```

2. use as preconfigured rule

   ```js
   // webpack.config.js
   module.exports = {
     entry: './index.js',
     output: {
       /* ... */
     },
     module: {
       rules: [
         {
           test: /\.https?$/,
           use: 'https-loader',
         },
       ],
     },
   };
   ```

   ```js
   const demo = require('./demo.http');
   ```
