export interface ConsumeUserDataModel {
  error?: object,
  text?: string,
  message?: string,
}

export interface ConsumeUserData {
  get (): Promise<ConsumeUserDataModel>
}