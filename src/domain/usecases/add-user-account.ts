import { UserModel } from "../models/user"

export interface AddUserAccountModel {
  fullName: string,
  email: string,
  address: string,
  addressNumber: string,
  phoneNumber: string,
}

export interface AddUserAccount {
  add (account: AddUserAccountModel): Promise<UserModel>
}