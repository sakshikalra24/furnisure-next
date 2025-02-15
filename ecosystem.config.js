module.exports = {
  apps: [
    {
      name: "furnisure",
      script: "npx",
      args: "serve -s build -l 3000",
      cwd: "./",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss", // Adds timestamps to logs
    },
  ],
};
