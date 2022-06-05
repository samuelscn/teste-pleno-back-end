import { Router } from 'express'
import { adaptRoute } from '../adapters/express-router-adapter'
import { makeConsumeUserController } from '../factories/consume-user'
import { makeExecuteAutomationController } from '../factories/execute-automation'

export default (router: Router): void => {
  router.get('/user', adaptRoute(makeConsumeUserController()))

  router.get('/automation', adaptRoute(makeExecuteAutomationController()))
}
