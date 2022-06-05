import { HttpResponse } from "../protocols/http";
import { ServerError } from "../errors/server-error";
import { EmptyDataError } from "../errors/empty-data-error";

export const badRequest = (error: Error): HttpResponse => ({ statusCode: 400, body: error })
export const ok = (data: any): HttpResponse => ({ statusCode: 200, body: data })
export const serverError = (error: Error): HttpResponse => ({ statusCode: 500, body: new ServerError(error.stack) })
export const empty = (): HttpResponse => ({ statusCode: 200, body: new EmptyDataError() })
