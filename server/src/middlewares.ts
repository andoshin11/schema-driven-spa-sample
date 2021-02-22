import { Handler } from 'express'

export const SetHeaderMiddleware: Handler = (req, res, next) => {
  const whitelist = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://localhost:3020']
  const origin = req.headers.origin
  if (typeof origin === 'string' && whitelist.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  } else {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080/')
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTION') {
    res.status(200).send()
  }

  next()
}
