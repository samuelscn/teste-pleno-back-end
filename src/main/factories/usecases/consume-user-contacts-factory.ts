import { ConsumeUserContacts } from "../../../infra/api/linkapi-desafio-tech/consume-user-contacts-repository/consume-user-contacts"
import { ConsumeUserContactsController } from "../../../presentation/controllers/consume-user-contacts"

export const makeConsumeUserContactsFactory = () => {
  const consumeUserContacts = new ConsumeUserContacts()
  return new ConsumeUserContactsController(consumeUserContacts)
}