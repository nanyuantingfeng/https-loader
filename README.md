# https-loader
>  a webpack loader for loading http(s) resources

[![npm][npm]][npm-url]
[![size][size]][size-url]


[npm-url]: https://www.npmjs.com/package/https-loader
[size]: https://packagephobia.now.sh/badge?p=https-loader
[size-url]: https://packagephobia.now.sh/result?p=https-loader





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
   const demo = require("https-loader!./demo.http")
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
           use: 'https-loader'
         },
       ],
     },
   };
   
   ```

   ```js
   const demo = require("./demo.http")
   ```

   



