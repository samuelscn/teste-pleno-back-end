import { Controller } from "../../presentation/protocols/controller"
import { HttpRequest } from "../../presentation/protocols/http"
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}