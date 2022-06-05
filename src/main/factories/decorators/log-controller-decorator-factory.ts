import { LogMongoRepository } from "../../../infra/db/mongodb/log-mongo-repository/log-mongo"
import { Controller } from "../../../presentation/protocols/controller"
import { LogControllerDecorator } from "../../decorators/log-controller-decorators"

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
