import { ConsumeUserAdress } from "../../../infra/api/linkapi-desafio-tech/consume-user-adress-repository/consume-user-adress"
import { ConsumeUserAdressController } from "../../../presentation/controllers/consume-user-adress"

export const makeConsumeUserAddressFactory = () => {
  const consumeUserAdress = new ConsumeUserAdress()
  return new ConsumeUserAdressController(consumeUserAdress)
}