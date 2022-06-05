import { TransformUserData } from "../../../presentation/utils/transform-user-data"

export const makeTransformUserDataFactory = () => {
  return new TransformUserData()
}