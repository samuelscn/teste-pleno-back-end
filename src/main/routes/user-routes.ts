import { Router } from 'express'
import { adaptRoute } from '../adapters/express-router-adapter'
import { makeConsumeUserController } from '../factories/controllers/consume-user'
import { makeExecuteAutomationController } from '../factories/controllers/execute-automation'

export default (router: Router): void => {
  router.get('/user', adaptRoute(makeConsumeUserController()))

  router.get('/automation', adaptRoute(makeExecuteAutomationController()))
}
