import { ConsumeUserDataRepository } from "../../../../data/protocols/consume-user-data-repository";
import { LinkApiDesafioTechHelper } from "../helpers/linkapi-desafio-tech-helper";

export class ConsumeUserData implements ConsumeUserDataRepository {
  async get (): Promise<any> {
    const consumeUserData = await LinkApiDesafioTechHelper.get('users/')
    return consumeUserData.data
  }
}