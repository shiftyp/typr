export enum ErrorType {
  CONTENT_TOO_LONG,
  NETWORK,
  UNKNOWN,
}

export const ErrorMessages: { [K in ErrorType]: string } = {
  [ErrorType.CONTENT_TOO_LONG]:
    'The content is too long to process. Limit is 241 characters',
  [ErrorType.NETWORK]: 'There has been a network communication error',
  [ErrorType.UNKNOWN]:
    'An unknown error has occured. Please try reloading the page',
}
