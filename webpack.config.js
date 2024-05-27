// webpack.config.js

module.exports = {
    // Your existing webpack configuration
    devServer: {
      setupMiddlewares: function(devServer) {
        // Your middleware setup for before and after
        devServer.app.use((req, res, next) => {
          // Middleware before setup
          console.log('Before setup middleware');
          next();
        });
  
        // Example middleware setup: adding a custom header
        devServer.app.use((req, res, next) => {
          res.setHeader('X-Custom-Header', 'Hello, world!');
          next();
        });
  
        devServer.app.use((req, res, next) => {
          // Middleware after setup
          console.log('After setup middleware');
          next();
        });
      },
    },
  };
  