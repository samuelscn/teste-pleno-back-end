import { DbConsumeUserData } from "../../data/usecases/consume-user-data/db-consume-user-data";
import { ConsumeUserData } from "../../infra/api/linkapi-desafio-tech/consume-user-data-repository/consume-user-data";
import { ConsumeUserDataController } from "../../presentation/controllers/consume-user-data";

export const makeConsumeUserController = (): ConsumeUserDataController => {
  const consumeUserDataRepository = new ConsumeUserData()
  const dbConsumeUserData = new DbConsumeUserData(consumeUserDataRepository)
  return new ConsumeUserDataController(dbConsumeUserData)
}