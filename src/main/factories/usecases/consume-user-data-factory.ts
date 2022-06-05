import { ConsumeUserData } from "../../../infra/api/linkapi-desafio-tech/consume-user-data-repository/consume-user-data"
import { ConsumeUserDataController } from "../../../presentation/controllers/consume-user-data"

export const makeConsumeUserDataFactory = () => {
  const consumeUserData = new ConsumeUserData()
  return new ConsumeUserDataController(consumeUserData)
}