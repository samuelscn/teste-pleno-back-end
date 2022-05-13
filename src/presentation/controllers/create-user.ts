import { HttpResponse, HttpRequest } from "../protocols/http"

export class CreateUserController {
  handle(httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new Error('Missing params')
    }
  }
}