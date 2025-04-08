/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       // Polling workaround lives here now
//       webpackBuildWorker: false,
//     },
//     // Custom Webpack config still allowed
//     webpack(config, { dev }) {
//       if (dev) {
//         config.watchOptions = {
//           poll: 1000, // 1 second
//           aggregateTimeout: 300,
//         };
//       }
//       return config;
//     },
//   };
  
//   export default nextConfig;