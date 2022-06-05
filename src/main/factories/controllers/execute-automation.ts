import { ExecuteAutomation } from "../../../presentation/controllers/execute-automation";
import { Controller } from "../../../presentation/protocols/controller";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";
import { makeConsumeUserAddressFactory, makeConsumeUserContactsFactory, makeConsumeUserDataFactory, makeUserAccountFactory } from "../usecases";
import { makeConvertXmlToJsonFactory, makeTransformUserDataFactory } from "../utils";

export const makeExecuteAutomationController = (): Controller => {
  const controller = new ExecuteAutomation(
    makeConsumeUserDataFactory(),
    makeConvertXmlToJsonFactory(),
    makeConsumeUserContactsFactory(),
    makeConsumeUserAddressFactory(),
    makeTransformUserDataFactory(),
    makeUserAccountFactory()
  )
  return makeLogControllerDecorator(controller)
}