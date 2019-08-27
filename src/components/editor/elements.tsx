import styled from 'styled-components'
import { FullWidthColumn, FullWidthRow } from '../flex'

export const OuterEditorContainer = styled(FullWidthColumn)`
  position: relative;
`

export const EditorInput = styled.input`
  display: block;
  flex: 1;
  margin-right: 5px;
`

export const EditorLabel = styled.label`
  margin-right: 5px;
`

export const EditorContainer = styled.div<{
  isError: boolean
}>`
  max-height: 100%;
  min-height: 5em;
  width: 100%;
  color: #000;
  margin-top: 10px;
  font-size: 1.5em;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid ${({ isError }) => (isError ? '#f00' : '#ccc')};
  box-sizing: content-box;

  .public-DraftStyleDefault-block,
  .public-DraftEditorPlaceholder-inner {
    line-height: 1.75em;
  }

  .public-DraftStyleDefault-block {
    margin-bottom: 3em;
    &:last-child {
      margin-bottom: 0.75em;
    }
  }
`

export const EditorControls = styled(FullWidthRow)`
  position: absolute;
  bottom: 10px;
  font-size: 0.5em;
  justify-content: space-between;
  transform: translateY(40px);
`

export const EditorButton = styled.button`
  border: 1px solid #aaa;
  background-color: #fff;
`
