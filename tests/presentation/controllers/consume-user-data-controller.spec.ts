import { ConsumeUserDataController } from "../../../src/presentation/controllers/consume-user-data"
import { EmptyDataError } from "../../../src/presentation/errors/empty-data-error"
import { ConsumeUserDataModel, ConsumeUserData } from "../../../src/domain/usecases/consume-user-data"
import { ServerError } from '../../../src/presentation/errors/server-error'

const makeConsumeUserData = () => {
  class ConsumeUserDataStub implements ConsumeUserData {
    async get (): Promise<ConsumeUserDataModel> {
      const fakeConsumeUserData = {
        error: {},
        text: "<data><pagination><page type=\"num\">1</page><limit type=\"num\">5</limit></pagination><usersList type=\"array\"><item><createdAt>2022-02-23T05:20:06.524Z</createdAt><firstName>Nakia</firstName><avatar>https://cdn.fakercloud.com/avatars/al_li_128.jpg</avatar><email>Melissa.Stamm84@hotmail.com</email><lastName>Towne</lastName><id>1</id></item><item><createdAt>2022-02-23T03:28:40.445Z</createdAt><firstName>Camila</firstName><avatar>https://cdn.fakercloud.com/avatars/craighenneberry_128.jpg</avatar><email>Chelsie69@hotmail.com</email><lastName>Cassin</lastName><id>2</id></item><item><createdAt>2022-02-22T13:13:32.147Z</createdAt><firstName>Carroll</firstName><avatar>https://cdn.fakercloud.com/avatars/woodydotmx_128.jpg</avatar><email>Wanda.Spinka91@yahoo.com</email><lastName>Dibbert</lastName><id>3</id></item><item><createdAt>2022-02-22T19:31:49.878Z</createdAt><firstName>Shea</firstName><avatar>https://cdn.fakercloud.com/avatars/kennyadr_128.jpg</avatar><email>Matilda30@hotmail.com</email><lastName>Dickinson</lastName><id>4</id></item><item><createdAt>2022-02-23T11:21:39.310Z</createdAt><firstName>Patsy</firstName><avatar>https://cdn.fakercloud.com/avatars/greenbes_128.jpg</avatar><email>Curt67@hotmail.com</email><lastName>Crist</lastName><id>5</id></item></usersList></data>"
      }
      return fakeConsumeUserData
    }
  }

  return new ConsumeUserDataStub()
}

type SutTypes = {
  sut: ConsumeUserDataController,
  consumeUserDataStub: ConsumeUserData
}

const makeSut = (): SutTypes => {
  const consumeUserDataStub = makeConsumeUserData()
  const sut = new ConsumeUserDataController(consumeUserDataStub)

  return {
    sut,
    consumeUserDataStub
  }
}

describe('ConsumeUserDataController', () => {
  test('should return 200 and warning if data is void in method get', async () => {
    const { sut, consumeUserDataStub } = makeSut()
    jest.spyOn(consumeUserDataStub, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, rejects) => resolve({ message: "<data>Something went wrong while parsing response JSON</data>" }))
    })

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(new EmptyDataError())
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(
      {
        error: {},
        text: "<data><pagination><page type=\"num\">1</page><limit type=\"num\">5</limit></pagination><usersList type=\"array\"><item><createdAt>2022-02-23T05:20:06.524Z</createdAt><firstName>Nakia</firstName><avatar>https://cdn.fakercloud.com/avatars/al_li_128.jpg</avatar><email>Melissa.Stamm84@hotmail.com</email><lastName>Towne</lastName><id>1</id></item><item><createdAt>2022-02-23T03:28:40.445Z</createdAt><firstName>Camila</firstName><avatar>https://cdn.fakercloud.com/avatars/craighenneberry_128.jpg</avatar><email>Chelsie69@hotmail.com</email><lastName>Cassin</lastName><id>2</id></item><item><createdAt>2022-02-22T13:13:32.147Z</createdAt><firstName>Carroll</firstName><avatar>https://cdn.fakercloud.com/avatars/woodydotmx_128.jpg</avatar><email>Wanda.Spinka91@yahoo.com</email><lastName>Dibbert</lastName><id>3</id></item><item><createdAt>2022-02-22T19:31:49.878Z</createdAt><firstName>Shea</firstName><avatar>https://cdn.fakercloud.com/avatars/kennyadr_128.jpg</avatar><email>Matilda30@hotmail.com</email><lastName>Dickinson</lastName><id>4</id></item><item><createdAt>2022-02-23T11:21:39.310Z</createdAt><firstName>Patsy</firstName><avatar>https://cdn.fakercloud.com/avatars/greenbes_128.jpg</avatar><email>Curt67@hotmail.com</email><lastName>Crist</lastName><id>5</id></item></usersList></data>"
      }
    )
  })

  test('should return 500 if consumeUserData throws', async () => {
    const { sut, consumeUserDataStub } = makeSut()
    jest.spyOn(consumeUserDataStub, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, rejects) => rejects(new Error()))
    })

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})