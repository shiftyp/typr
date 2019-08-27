import * as React from 'react'
import { ErrorType, ErrorMessages } from '../../errors'
import { ErrorMessageContainer, ErrorOverlay } from './elements'
import { FullWidthRow } from '../flex'

export type ErrorMessageProps = {
  error: ErrorType
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <ErrorMessageContainer>{ErrorMessages[error]}</ErrorMessageContainer>
)

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }
  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          {this.props.children}
          <ErrorOverlay justifyContent="center" alignItems="center">
            <ErrorMessage error={ErrorType.UNKNOWN} />
          </ErrorOverlay>
        </>
      )
    } else {
      return <>{this.props.children}</>
    }
  }
}
