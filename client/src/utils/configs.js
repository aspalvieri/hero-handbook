const configs = {
  development: {
    SERVER_URL: "http://localhost:5000"
  },
  production: {
    SERVER_URL: "https://api.hero.aspalvieri.com"
  }
};

export const config = configs[process.env.NODE_ENV];

export const requestConf = {
  withCredentials: true
};
