module.exports = {
  apps: [
    {
      name: "furnisure",
      script: "npm",
      args: "run start", // Use the start script of Next.js
      cwd: "./", // Ensure it is the root of the project
      exec_mode: "fork", // Fork mode is enough for most cases
      instances: 1, // You can increase this if you're using clustering
      autorestart: true, // Automatically restart on failure
      watch: false, // Disables file watching (good for production)
      env: {
        NODE_ENV: "production", // Ensure we're in production mode
        PORT: 3000, // Use the desired port
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
