/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

/*



const Dotenv = require("dotenv-webpack");
const nextConfig = {
  reactStrictMode: false,

  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    config.resolve.fallback = {
      fs: false,
      path: false,
      stream: false,
      crypto: false,
      http: false,
      https: false,
      os: false,
      assert: false,
      querystring: false,
      events: false,
    };
    return config;
  },
};

module.exports = nextConfig;



*/
