import { UserAccount } from "../../../infra/db/mongodb/user-account-repository/user-account"
import { CreateUserController } from "../../../presentation/controllers/create-user"

export const makeUserAccountFactory = () => {
  const addUserAccount = new UserAccount()
  return new CreateUserController(addUserAccount)
}