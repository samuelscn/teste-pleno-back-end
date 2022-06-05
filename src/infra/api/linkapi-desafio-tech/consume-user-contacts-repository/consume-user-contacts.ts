import { ConsumeUserContactsRepository } from "../../../../data/protocols/consume-user-contacts-repository";
import { LinkApiDesafioTechHelper } from "../helpers/linkapi-desafio-tech-helper";

export class ConsumeUserContacts implements ConsumeUserContactsRepository {
  async get (id: string): Promise<any> {
    const consumeUserContacts = await LinkApiDesafioTechHelper.get(`users/${id}/contacts`)
    
    return consumeUserContacts.data
  }
}