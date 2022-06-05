import { ConsumeUserAdress } from "../../infra/api/linkapi-desafio-tech/consume-user-adress-repository/consume-user-adress";
import { ConsumeUserContacts } from "../../infra/api/linkapi-desafio-tech/consume-user-contacts-repository/consume-user-contacts";
import { ConsumeUserData } from "../../infra/api/linkapi-desafio-tech/consume-user-data-repository/consume-user-data";
import { UserAccount } from "../../infra/db/mongodb/user-account-repository/user-account";
import { ConsumeUserAdressController } from "../../presentation/controllers/consume-user-adress";
import { ConsumeUserContactsController } from "../../presentation/controllers/consume-user-contacts";
import { ConsumeUserDataController } from "../../presentation/controllers/consume-user-data";
import { CreateUserController } from "../../presentation/controllers/create-user";
import { ExecuteAutomation } from "../../presentation/controllers/execute-automation";
import { ConvertXmlToJson } from "../../presentation/utils/convert-xml-to-json";
import { TransformUserData } from "../../presentation/utils/transform-user-data";

export const makeExecuteAutomationController = (): ExecuteAutomation => {
  const consumeUserData = new ConsumeUserData()
  const convertXmlToJson = new ConvertXmlToJson()
  const consumeUserDataController = new ConsumeUserDataController(consumeUserData)
  const consumeUserContacts = new ConsumeUserContacts()
  const consumeUserAdress = new ConsumeUserAdress()
  const consumeUserContactsController = new ConsumeUserContactsController(consumeUserContacts)
  const consumeUserAdressController = new ConsumeUserAdressController(consumeUserAdress)
  const transformUserData = new TransformUserData()
  const addUserAccount = new UserAccount()
  const createUserController = new CreateUserController(addUserAccount)
  return new ExecuteAutomation(consumeUserDataController, convertXmlToJson, consumeUserContactsController, consumeUserAdressController, transformUserData, createUserController)
}