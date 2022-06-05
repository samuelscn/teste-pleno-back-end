export class TransformUserData {
  handle (userData: any): any {
    return {
      body: {
        fullName: `${userData.firstName[0]} ${userData.lastName[0]}`,
        email: userData.email[0],
        address: userData.street[0],
        addressNumber: userData.number[0]['_'],
        phoneNumber: userData.phoneNumber[0]
      }
    }
  }   
}