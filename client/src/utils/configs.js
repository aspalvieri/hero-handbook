const configs = {
  development: {
    SERVER_URL: "http://192.168.0.15:5000"
  },
  production: {
    SERVER_URL: "https://api.hero.aspalvieri.com"
  }
};

export const config = configs[process.env.NODE_ENV];

export const requestConf = {
  withCredentials: true
};
