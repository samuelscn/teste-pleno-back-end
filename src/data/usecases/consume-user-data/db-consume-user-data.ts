import { ConsumeUserData, ConsumeUserDataModel } from "../../../domain/usecases/consume-user-data";
import { ConsumeUserDataRepository } from "../../protocols/consume-user-data-repository";

export class DbConsumeUserData implements ConsumeUserData {
  constructor(private readonly consumeUserDataRepository: ConsumeUserDataRepository) {}

  async get (): Promise<ConsumeUserDataModel> {
    const consumeUserData = this.consumeUserDataRepository.get()
    return consumeUserData
  }
}