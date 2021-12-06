function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express();

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
/** this is custom js to help proxy in server.js*/
const webpackConfig = require('./webpack.config.js');

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

runServer();
/** If you have error creating proxy <app-url> to localhost
 * Heroku internally redirect the Server port 8080 .
 *  For that reason we need to open listener  port(I used 3000 here) redirect
 through http-proxy-middleware*/
app.use("/*", createProxyMiddleware(
  { target: "https://movesy.herokuapp.com",
    ws: true ,
    changeOrigin: true,
    secure:true,
    router: {
      'https://movesy-admin.herokuapp.com': 'https://movesy.herokuapp.com',
    },}))

app.listen(process.env.PORT || 3000)
