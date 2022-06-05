import setupRoutes from './routes'
import setupMiddlewares from './middlewares'

import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app