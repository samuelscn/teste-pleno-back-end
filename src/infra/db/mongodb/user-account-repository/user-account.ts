import { AddUserAccountRepository } from "../../../../data/protocols/add-user-account-repository";
import { UserModel } from "../../../../domain/models/user";
import { AddUserAccountModel } from "../../../../domain/usecases/add-user-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class UserAccount implements AddUserAccountRepository {
  async add (accountUserData: AddUserAccountModel): Promise<UserModel> {
    const accountUserCollection = MongoHelper.getCollection('users')
    const result = await accountUserCollection.insertOne(accountUserData)
    const findUserResult = await accountUserCollection.findOne({
      _id: result.insertedId
    })
    return MongoHelper.map(findUserResult)
  }
}