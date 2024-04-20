module.exports = {
    apps: [
      {
        name: `web-bridge-snu`,
        script: "serve",
        autorestart: true,
        env: {
          // PM2_SERVE_PATH: "./dist",
          PM2_SERVE_PORT: 3000,
          PM2_SERVE_SPA: "true",
          NODE_ENV: 'production',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };