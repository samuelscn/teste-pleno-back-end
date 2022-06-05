import { ConsumeUserAdress } from "../../domain/usecases/consume-user-adress";
import { serverError, ok } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class ConsumeUserAdressController implements Controller {
  constructor(
    private readonly consumeUserAdress: ConsumeUserAdress
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const resultConsumeUserAdress = await this.consumeUserAdress.get(httpRequest.toString())

      return ok(resultConsumeUserAdress)
    } catch (error: any) {
      return serverError(error)
    }
  }
}