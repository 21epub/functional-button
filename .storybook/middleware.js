const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/v3',
    createProxyMiddleware({
      target: 'https://cbt.21epub.com:8443',
      changeOrigin: true,
    })
  )
}
