/** @type {import('next').NextConfig} */

const withPWA = require("@imbios/next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === 'development',
    exclude: [
        ({ asset, compilation }) => {
          if (
            asset.name.startsWith("server/") ||
            asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json|live|match)$/)
          ) {
            return true;
          }
          if (isDev && !asset.name.startsWith("static/runtime/")) {
            return true;
          }
          return false;
        }
      ],
});

const isDev = process.env.NODE_ENV !== "production";

module.exports = withPWA({
    // next.js config
});