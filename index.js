/***************************************************
 * Created by nanyuantingfeng on 2020/2/27 17:35. *
 ***************************************************/
const https = require('https');
const http = require('http');

// callback(err, result, sourceMaps, ast)
function loadSource(url, callback) {
  const Q = url.startsWith('https://') ? https : http;
  Q.get(url, (res) => {
    const statusCode = res.statusCode;
    // const contentType = res.headers['content-type'];
    let error;

    if (statusCode !== 200) {
      error = new Error(
        'REQUEST FAILED\n' + 'STATUS CODE: ' + statusCode + '\n' + url
      );
    }

    if (error) {
      callback(error);
      res.resume();
      return;
    }

    res.setEncoding('utf8');

    let rawData = '';

    res.on('data', (chunk) => (rawData += chunk));

    res.on('end', () => {
      try {
        callback(null, rawData);
      } catch (e) {
        callback(e);
      }
    });
  }).on('error', (e) => callback(e));
}

module.exports = function loader(source) {
  const callback = this.async();
  const src = source.trim();

  if (!src) {
    return callback(null, '');
  }

  loadSource(src, callback);
  return undefined;
};
