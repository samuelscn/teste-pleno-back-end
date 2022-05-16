import { empty, ok, serverError } from "../helpers/http-helper"
import { HttpResponse, HttpRequest } from "../protocols/http"
import { ConsumeUserData } from "../../domain/usecases/consume-user-data"

export class ConsumeUserDataController {
  constructor(private readonly consumeUserData: ConsumeUserData) {}

  async handle(): Promise<HttpResponse> {
    try {
      const userData = await this.consumeUserData.get()

      if (userData?.message) {
        return empty()
      }
      return ok(userData)
    } catch (error) {
      return serverError()
    }
  }
}