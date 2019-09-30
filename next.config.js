const withSass = require("@zeit/next-sass");
const compose = require("next-compose");
const withOffline = require("next-offline");

const nextConfig = {
  debug: true,
  target: "serverless",
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: "static/service-worker.js",
    clientsClaim: true,
    skipWaiting: true,
    globPatterns: [
      ".next/static/*",
      ".next/static/chunks/*",
      ".next/static/css/*"
    ],
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200
          }
        }
      },
      {
        urlPattern: ".(png|svg|jpg|jpeg)$",
        handler: "CacheFirst",
        options: {
          cacheName: "My-awesome-cache-Images",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 7,
            maxEntries: 50,
            purgeOnQuotaError: true
          }
        }
      },
      {
        urlPattern: "^https://newsapi.org/v2/?(.*)",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "My-awesome-cache-news",
          expiration: {
            maxAgeSeconds: 60 * 30 //cache the news content for 30mn
          }
        }
      }
    ]
  }
};

module.exports = compose([[withOffline, nextConfig], [withSass]]);
