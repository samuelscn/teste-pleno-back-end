export interface ConsumeUserAdressModel {
  error?: object,
  text?: string,
  message?: string,
  body?: any,
}

export interface ConsumeUserAdress {
  get (id: string): Promise<ConsumeUserAdressModel>
}