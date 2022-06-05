import { ConsumeUserAdressRepository } from "../../../../data/protocols/consume-user-adress-repository";
import { LinkApiDesafioTechHelper } from "../helpers/linkapi-desafio-tech-helper";

export class ConsumeUserAdress implements ConsumeUserAdressRepository {
  async get (id: string): Promise<any> {
    const consumeUserAdress = await LinkApiDesafioTechHelper.get(`users/${id}/address`)
    return consumeUserAdress.data
  }
}