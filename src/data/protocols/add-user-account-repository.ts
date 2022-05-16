import { UserModel } from "../../domain/models/user";
import { AddUserAccountModel } from "../../domain/usecases/add-user-account";

export interface AddUserAccountRepository {
  add (accountUserData: AddUserAccountModel): Promise<UserModel>
}