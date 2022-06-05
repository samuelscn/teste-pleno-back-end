export interface ConsumeUserDataModel {
  error?: object,
  text?: string,
  message?: string,
  body?: any,
}

export interface ConsumeUserData {
  get (): Promise<ConsumeUserDataModel>
}