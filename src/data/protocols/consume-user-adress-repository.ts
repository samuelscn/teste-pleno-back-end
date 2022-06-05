import { ConsumeUserAdressModel } from "../../domain/usecases/consume-user-adress";

export interface ConsumeUserAdressRepository {
  get (id: string): Promise<ConsumeUserAdressModel>
}