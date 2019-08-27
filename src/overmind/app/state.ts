import { Derive } from 'overmind'
import { ErrorType } from '../../errors'

export type State = {
  error: ErrorType
  isError: Derive<State, boolean>
}

export const state: State = {
  error: null,
  isError: state => state.error !== null,
}
