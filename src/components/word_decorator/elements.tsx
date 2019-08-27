import styled, { keyframes } from 'styled-components'
import { frequencyToLuminosity } from '../../utils'

export const Word = styled.span<{ open: boolean }>`
  height: 1.5em;
  vertical-align: baseline;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  background-color: ${({ open }) => (open ? '#eee' : 'transparent')};
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const WordTag = styled.div<{
  open: boolean
  width: number
  height: number
  top: number
  left: number
  frequency: number
  min: number
  max: number
}>`
  user-select: none;
  padding: 0 2px;
  font-size: 0.5em;
  color: #000;
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: ${({ width }) => `${width}px`};
  top: ${({ top, height }) => top + height}px;
  left: ${({ left }) => left}px;
  white-space: pre-wrap;
  overflow: hidden;
  background-color: #eee;
  border-width: ${({ frequency, open }) =>
    frequency === -1 ? '1px' : open ? '0.5em' : '0.25em'};
  border-top-style: ${({ frequency }) => (frequency === -1 ? 'none' : 'solid')};
  border-bottom-style: ${({ frequency }) =>
    frequency === -1 ? 'dashed' : 'solid'};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  border-color: hsl(
    0,
    0%,
    ${({ frequency, min, max }) =>
      `${frequencyToLuminosity(frequency, min, max)}%`}
  );
  z-index: ${({ open }) => (open ? 3 : 2)};
  animation: ${fadeIn} 1s;
`

export const WordReplacement = styled.div<{
  open: boolean
  editorHasFocus: boolean
}>`
  font-size: 18px;
  padding: 10px 0;
  cursor: pointer;
  display: ${({ open }) => (open ? 'block' : 'none')};

  &.selected {
    text-decoration: ${({ editorHasFocus }) =>
      editorHasFocus ? 'underline' : 'none'};
  }

  &:active {
    text-decoration: underline;
  }
`
