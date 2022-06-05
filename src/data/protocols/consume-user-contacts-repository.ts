import { ConsumeUserContactsModel } from "../../domain/usecases/consume-user-contacts";

export interface ConsumeUserContactsRepository {
  get (id: string): Promise<ConsumeUserContactsModel>
}