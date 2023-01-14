const { createProxyMiddleware } = require('http-proxy-middleware')

const apiProxy = createProxyMiddleware({
  target: 'https://api.open-meteo.com/v1/forecast',
  changeOrigin: true,
  pathRewrite: {
    '^/api/weather': ''
  }
})

export default function (req, res) {
  return apiProxy(req, res)
}
