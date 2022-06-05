import { ConsumeUserDataModel } from "../../domain/usecases/consume-user-data";

export interface ConsumeUserDataRepository {
  get (): Promise<ConsumeUserDataModel>
}