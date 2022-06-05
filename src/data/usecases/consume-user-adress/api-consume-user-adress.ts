import { ConsumeUserAdress, ConsumeUserAdressModel } from "../../../domain/usecases/consume-user-adress";
import { ConsumeUserAdressRepository } from "../../protocols/consume-user-adress-repository";

export class ApiConsumeUserAdress implements ConsumeUserAdress {
  constructor(private readonly consumeUserAdressRepository: ConsumeUserAdressRepository) {}

  async get (id: string): Promise<ConsumeUserAdressModel> {
    const consumeUserAdress = this.consumeUserAdressRepository.get(id)
    return consumeUserAdress
  }
}