import cron from 'node-cron'
import { adaptRoute } from '../adapters/express-router-adapter'
import { makeExecuteAutomationController } from '../factories/execute-automation'

export class ManagerCron {
  constructor() {}

  run () {
    console.log('Running a automation every one minute...')
    cron.schedule('*/1 * * * *', adaptRoute(makeExecuteAutomationController()), {
      scheduled: true
    })
  }
}