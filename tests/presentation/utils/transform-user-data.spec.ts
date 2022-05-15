import { TransformUserData } from "../../../src/presentation/utils/transform-user-data"

describe('TransformUserData', () => {
  test('Should return a new user structure', async () => {
    const sut = new TransformUserData()

    const body = {
      firstName: "any_firstName",
      createdAt: "2022-02-23T05:20:06.524Z",
      avatar: "https://cdn.fakercloud.com/avatars/al_li_128.jpg",
      email: "any_email",
      lastName: "any_fullName",
      id: 1
    }

    const userDT = sut.handle(body)
    expect(userDT).toEqual(
      {
        fullName: "any_firstName any_fullName",
        email: "any_email",
        adress: "any_adress",
        addressNumber: 0,
        phoneNumber: "any_phone"
      }
    )
  })
})