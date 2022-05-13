import { HttpResponse, HttpRequest } from "../protocols/http"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest, ok, serverError } from "../helpers/http-helper"
import { AddUserAccount } from "../../domain/usecases/AddUserAccount"
export class CreateUserController {
  constructor(private readonly addUserAccount: AddUserAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['fullName', 'email', 'addressNumber', 'address', 'phoneNumber']
    
      for (const fields of requiredFields) {
        if (!httpRequest.body[fields]) {
          return badRequest(new MissingParamError(fields))
        }
      }

      const userAccount = await this.addUserAccount.add(httpRequest.body)
      return ok(userAccount)
    } catch (error) {
      return serverError()
    }
  }
}