export interface ConsumeUserDataModel {
  fullName: string,
  email: string,
  address: string,
  addressNumber: string,
  phoneNumber: string,
}

export interface ConsumeUserData {
  get (): Promise<Array<ConsumeUserDataModel>>
}