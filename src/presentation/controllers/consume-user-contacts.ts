import { ConsumeUserContacts } from "../../domain/usecases/consume-user-contacts";
import { serverError, ok } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class ConsumeUserContactsController implements Controller {
  constructor(
    private readonly consumeUserContacts: ConsumeUserContacts
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const resultConsumeUserContacts = await this.consumeUserContacts.get(httpRequest.toString())

      return ok(resultConsumeUserContacts)
    } catch (error: any) {
      return serverError(error)
    }
  }
}