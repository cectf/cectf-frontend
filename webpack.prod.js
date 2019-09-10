const path = require('path');

module.exports = env => {
  return merge(common(env), {
    mode: 'production',
  });
};