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
      if (resultConsumeUser.statusCode === 500) throw resultConsumeUser
      const arrayUser = await this.convertXmlToJson.handle(resultConsumeUser.body)
      const insertUsers = await Promise.all(arrayUser.data.usersList[0].item.map(async (user: any) => {
        let adress = await this.consumeUserAdress.handle(user.id[0])
        if (adress.statusCode === 500) throw adress
        let contacts = await this.consumeUserContacts.handle(user.id[0])
        if (contacts.statusCode === 500) throw contacts
        const newAdress = this.convertXmlToJson.handle(adress.body)
        const newContacts = this.convertXmlToJson.handle(contacts.body)
        const userDT = this.transformUserData.handle(Object.assign({}, user, newAdress.data.item[0], newContacts.data.item[0]))
        const createUser = await this.createUserController.handle(userDT)
        if (createUser.statusCode === 500) throw createUser
        return createUser
      }))
      
      console.log('Usuarios inseridos')
      return ok(insertUsers)
    } catch (error: any) {
      return serverError(error)
    }
  }
}