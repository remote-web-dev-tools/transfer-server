module.exports = {
  apps: [
    {
      name: 'loggerServer',
      script: './dist/main.js',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 9000,
        NODE_ENV: 'production',
      },
    },
  ],
};
