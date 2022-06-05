import { LogErrorRepository } from "../../data/protocols/db/log"
import { Controller } from "../../presentation/protocols/controller"
import { HttpResponse } from "../../presentation/protocols/http"


export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
