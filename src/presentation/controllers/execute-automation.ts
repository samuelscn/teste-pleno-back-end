import { ok, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { ConvertXmlToJson } from "../utils/convert-xml-to-json";
import { TransformUserData } from "../utils/transform-user-data";
import { ConsumeUserAdressController } from "./consume-user-adress";
import { ConsumeUserContactsController } from "./consume-user-contacts";
import { ConsumeUserDataController } from "./consume-user-data";
import { CreateUserController } from "./create-user";

export class ExecuteAutomation implements Controller {
  constructor(
    private readonly consumeUserDataController: ConsumeUserDataController,
    private readonly convertXmlToJson: ConvertXmlToJson,
    private readonly consumeUserContacts: ConsumeUserContactsController,
    private readonly consumeUserAdress: ConsumeUserAdressController,
    private readonly transformUserData: TransformUserData,
    private readonly createUserController: CreateUserController
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const resultConsumeUser = await this.consumeUserDataController.handle(httpRequest)
      const arrayUser = await this.convertXmlToJson.handle(resultConsumeUser.body)
      const insertUsers = await Promise.all(arrayUser.data.usersList[0].item.map(async (user: any) => {
        let adress = await this.consumeUserAdress.handle(user.id[0])
        let contacts = await this.consumeUserContacts.handle(user.id[0])
        const newAdress = this.convertXmlToJson.handle(adress.body)
        const newContacts = this.convertXmlToJson.handle(contacts.body)
        const userDT = this.transformUserData.handle(Object.assign({}, user, newAdress.data.item[0], newContacts.data.item[0]))
        return this.createUserController.handle(userDT)
      }))
      
      console.log('Usuarios inseridos')
      return ok(insertUsers)
    } catch (error) {
      return serverError()
    }
  }
}