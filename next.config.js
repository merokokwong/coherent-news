// next.config.js
const withSass = require("@zeit/next-sass");
const compose = require("next-compose");
const withOffline = require("next-offline");

const nextConfig = {
  generateInDevMode: true,
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /.png$/,
        handler: "CacheFirst"
      },
      {
        urlPattern: /api/,
        handler: "NetworkFirst",
        options: {
          cacheableResponse: {
            statuses: [0, 200],
            headers: {
              "x-test": "true"
            }
          }
        }
      }
    ]
  }
};

module.exports = compose([[withOffline], [withSass]]);
