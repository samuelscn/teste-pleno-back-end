import { ConsumeUserDataController } from "../../../src/presentation/controllers/consume-user-data"
import { EmptyDataError } from "../../../src/presentation/errors/empty-data-error"
import { ConsumeUserDataModel, ConsumeUserData } from "../../../src/domain/usecases/consume-user-data"
import { ServerError } from '../../../src/presentation/errors/server-error'

const makeConsumeUserData = () => {
  class ConsumeUserDataStub implements ConsumeUserData {
    async get (): Promise<Array<ConsumeUserDataModel>> {
      const fakeConsumeUserData = [
        {
          id: 'valid_id',
          fullName: 'valid_fullName',
          email: 'valid_email@mail.com',
          address: 'valid_address',
          addressNumber: 'valid_address_number',
          phoneNumber: 'valid_phone_number'
        },
        {
          id: 'valid_id',
          fullName: 'valid_fullName',
          email: 'valid_email@mail.com',
          address: 'valid_address',
          addressNumber: 'valid_address_number',
          phoneNumber: 'valid_phone_number'
        },
      ]
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
      return new Promise((resolve, rejects) => resolve([]))
    })

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(new EmptyDataError())
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
      {
        id: 'valid_id',
        fullName: 'valid_fullName',
        email: 'valid_email@mail.com',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        phoneNumber: 'valid_phone_number'
      },
      {
        id: 'valid_id',
        fullName: 'valid_fullName',
        email: 'valid_email@mail.com',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        phoneNumber: 'valid_phone_number'
      },
    ])
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