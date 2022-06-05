import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
import { ManagerCron } from './cron/manager-cron'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    const managerCron = new ManagerCron()
    managerCron.run()
  })
  .catch(console.error)
