import { CreateUserController } from '../../../src/presentation/controllers/create-user'
import { MissingParamError } from '../../../src/presentation/errors/missing-param-error'
import { AddUserAccount, AddUserAccountModel } from '../../../src/domain/usecases/add-user-account'
import { UserModel } from '../../../src/domain/models/User'
import { ServerError } from '../../../src/presentation/errors/server-error'

type SutTypes = {
  sut: CreateUserController,
  addUserAccountStub: AddUserAccount,
}

const makeAddUserAccount = () => {
  class AddUserAccountStub implements AddUserAccount {
    async add (account: AddUserAccountModel): Promise<UserModel> {
      const fakeAccount = {
        id: 'valid_id',
        fullName: 'valid_fullName',
        email: 'valid_email@mail.com',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        phoneNumber: 'valid_phone_number'
      }
      return fakeAccount
    }
  }
  
  return new AddUserAccountStub()
}

const makeSut = (): SutTypes => {
  const addUserAccountStub = makeAddUserAccount()
  const sut = new CreateUserController(addUserAccountStub)

  return {
    sut,
    addUserAccountStub
  }
}

describe('AddUserController', () => {
  test('should return 400 if no fullName is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email',
        address: 'any_address',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('fullName'))
  })

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        address: 'any_address',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no addressNumber is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        email: 'any_email',
        address: 'any_address',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('addressNumber'))
  })

  test('should return 400 if no address is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        email: 'any_email',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('address'))
  })

  test('should return 400 if no phoneNumber is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        email: 'any_email',
        addressNumber: 'any_address_number',
        address: 'any_address',
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('phoneNumber'))
  })

  test('should call AddUserAccount with correct values', async () => {
    const { sut, addUserAccountStub } = makeSut()
    const addSpy = jest.spyOn(addUserAccountStub, 'add')
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        email: 'any_email@mail.com',
        address: 'any_address',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      fullName: 'any_fullName',
      email: 'any_email@mail.com',
      address: 'any_address',
      addressNumber: 'any_address_number',
      phoneNumber: 'any_phone_number'
    })
  })

  test('should return 500 if AddUserAccount throws', async () => {
    const { sut, addUserAccountStub } = makeSut()
    jest.spyOn(addUserAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, rejects) => rejects(new Error()))
    })
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        email: 'any_email@mail.com',
        address: 'any_address',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        fullName: 'valid_fullName',
        email: 'valid_email@mail.com',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        phoneNumber: 'valid_phone_number'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      fullName: 'valid_fullName',
      email: 'valid_email@mail.com',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      phoneNumber: 'valid_phone_number'
    })
  })
})