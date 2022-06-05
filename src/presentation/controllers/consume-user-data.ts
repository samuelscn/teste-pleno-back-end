import { empty, ok, serverError } from "../helpers/http-helper"
import { HttpResponse, HttpRequest } from "../protocols/http"
import { ConsumeUserData } from "../../domain/usecases/consume-user-data"
import { Controller } from "../protocols/controller"
export class ConsumeUserDataController implements Controller {
  constructor(
    private readonly consumeUserData: ConsumeUserData,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userData = await this.consumeUserData.get()

      if (userData?.message) {
        return empty()
      }
      return ok(userData)
    } catch (error: any) {
      return serverError(error)
    }
  }
}