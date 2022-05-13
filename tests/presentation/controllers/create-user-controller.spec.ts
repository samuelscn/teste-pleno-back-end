import { CreateUserController } from '../../../src/presentation/controllers/create-user'
import { MissingParamError } from '../../../src/presentation/errors/missing-param-error'

describe('AddUserController', () => {
  test('should return 400 if no fullName is provided', () => {
    const sut = new CreateUserController()
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
    const sut = new CreateUserController()
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
    const sut = new CreateUserController()
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
    const sut = new CreateUserController()
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
    const sut = new CreateUserController()
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
})