const querystring = require('querystring');

module.exports = (clientId, clientSecret) => {
  const str = `${ querystring.escape(clientId) }:${ querystring.escape(clientSecret) }`.toString('base64');
  return Buffer.from(str);
};