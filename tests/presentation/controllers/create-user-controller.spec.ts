import { CreateUserController } from '../../../src/presentation/controllers/create-user'
import { MissingParamError } from '../../../src/presentation/errors/missing-param-error'
import { AddUserAccount, AddUserAccountModel } from '../../../src/domain/usecases/AddUserAccount'
import { UserModel } from '../../../src/domain/models/User'

type SutTypes = {
  sut: CreateUserController,
  addUserAccountStub: AddUserAccount,
}

const makeAddUserAccount = () => {
  class AddUserAccountStub implements AddUserAccount {
    add (account: AddUserAccountModel): UserModel {
      const fakeAccount = {
        id: 'valid_id',
        fullName: 'valid_fullName',
        email: 'valid_email',
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
  test('should return 400 if no fullName is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email',
        address: 'any_address',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('fullName'))
  })

  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        address: 'any_address',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no addressNumber is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        email: 'any_email',
        address: 'any_address',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('addressNumber'))
  })

  test('should return 400 if no address is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        email: 'any_email',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('address'))
  })

  test('should return 400 if no phoneNumber is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        fullName: 'any_fullName',
        email: 'any_email',
        addressNumber: 'any_address_number',
        address: 'any_address',
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('phoneNumber'))
  })

  test('should call AddUserAccount with correct values', () => {
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

    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      fullName: 'any_fullName',
      email: 'any_email@mail.com',
      address: 'any_address',
      addressNumber: 'any_address_number',
      phoneNumber: 'any_phone_number'
    })
  })
})