import { ConsumeUserContacts, ConsumeUserContactsModel } from "../../../domain/usecases/consume-user-contacts";
import { ConsumeUserContactsRepository } from "../../protocols/consume-user-contacts-repository";

export class ApiConsumeUserContacts implements ConsumeUserContacts {
  constructor(private readonly consumeUserContactsRepository: ConsumeUserContactsRepository) {}

  async get (id: string): Promise<ConsumeUserContactsModel> {
    const consumeUserContacts = this.consumeUserContactsRepository.get(id)
    return consumeUserContacts
  }
}