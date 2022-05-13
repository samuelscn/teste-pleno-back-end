import { HttpResponse, HttpRequest } from "../protocols/http"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest, ok } from "../helpers/http-helper"
import { AddUserAccount } from "../../domain/usecases/AddUserAccount"
export class CreateUserController {
  constructor(private readonly addUserAccount: AddUserAccount) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['fullName', 'email', 'addressNumber', 'address', 'phoneNumber']
    
    for (const fields of requiredFields) {
      if (!httpRequest.body[fields]) {
        return badRequest(new MissingParamError(fields))
      }
    }

    const userAccount = this.addUserAccount.add(httpRequest.body)
    return {
      statusCode: 200,
      body: userAccount,
    }
    // return ok(userAccount)
  }
}