export class EmptyDataError extends Error {
  constructor () {
    super(`Empty data!`)
    this.name = 'EmptyDataError'
  }
}