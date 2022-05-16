import setupRoutes from './routes'

import express, { Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupRoutes(app)
  return app
}
