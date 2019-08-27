import styled from 'styled-components'
import { Row } from '../flex'

export const ErrorMessageContainer = styled.div`
  font-size: 1rem;
  color: #f00;

  &::before,
  &::after {
    content: ' ⚠️ ';
  }
`

export const ErrorOverlay = styled(Row)`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -40px;
  background-color: rgba(0, 0, 0, 0.1);
`
