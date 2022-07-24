const configs = {
  development: {
    SERVER_URI: 'http://localhost:5000'
  },
  production: {
    SERVER_URI: 'https://api-dot-hero-aspalvieri.uc.r.appspot.com'
  }
};

module.exports.config = configs[process.env.NODE_ENV];