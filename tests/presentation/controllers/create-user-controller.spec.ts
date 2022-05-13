import { CreateUserController } from '../../../src/presentation/controllers/create-user'

describe('AddUserController', () => {
  test('should return 400 if no fullName is provided', () => {
    const sut = new CreateUserController()
    const httpRequest = {
      body: {
        email: 'any_password',
        address: 'any_confirm_password',
        addressNumber: 'any_address_number',
        phoneNumber: 'any_phone_number'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})