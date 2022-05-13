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
})