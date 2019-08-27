import { Action } from 'overmind'
import { ErrorType } from '../../errors'

export const setError: Action<ErrorType> = ({ state }, error) => {
  state.app.error = error
}

export const clearError: Action<ErrorType> = ({ state }, error) => {
  if (state.app.error === error) {
    state.app.error = null
  }
}
