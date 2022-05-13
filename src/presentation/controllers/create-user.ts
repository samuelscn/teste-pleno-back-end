import { HttpResponse, HttpRequest } from "../protocols/http"
import { MissingParamError } from "../errors/missing-param-error"

export class CreateUserController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['fullName', 'email']
    
    for (const fields of requiredFields) {
      if (!httpRequest.body[fields]) {
        return {
          statusCode: 400,
          body: new MissingParamError(fields)
        }
      }
    }
  }
}