export interface ConsumeUserContactsModel {
  error?: object,
  text?: string,
  message?: string,
  body?: any,
}

export interface ConsumeUserContacts {
  get (id: string): Promise<ConsumeUserContactsModel>
}