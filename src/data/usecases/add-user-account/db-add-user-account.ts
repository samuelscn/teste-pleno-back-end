import { UserModel } from "../../../domain/models/user";
import { AddUserAccount, AddUserAccountModel } from "../../../domain/usecases/add-user-account";
import { AddUserAccountRepository } from "../../protocols/add-user-account-repository";

export class DbAddUserAccount implements AddUserAccount {
  constructor(private readonly addUserAccountRepository: AddUserAccountRepository) {}

  async add (accountData: AddUserAccountModel): Promise<UserModel> {
    const userAccount = this.addUserAccountRepository.add(accountData)
    return userAccount
  }
}