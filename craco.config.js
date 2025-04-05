// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/index.ts'),
      '@layouts': path.resolve(__dirname, 'src/layouts/index.ts'),
      '@slices': path.resolve(__dirname, 'src/redux/slices/index.ts'), 
      '@store': path.resolve(__dirname, 'src/redux/redux/store.ts'),
      '@api': path.resolve(__dirname, 'src/api/axios.ts'),
      '@api-paths': path.resolve(__dirname, 'src/api/api-config.ts'),
      '@api-mutations': path.resolve(__dirname, 'src/api/mutations/index.ts'),
      '@api-queries': path.resolve(__dirname, 'src/api/queries/index.ts'),
      '@src': path.resolve(__dirname, 'src/')
    }
  }
};
