import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useOvermind } from '../../overmind'
import { Word, WordTag, WordReplacement } from './elements'
import { isCaptialized } from '../../utils'
import { EditorState, CompositeDecorator } from 'draft-js'
import { useWordBoundingBox } from '../../hooks'
import cs from 'classnames'
import { EditorContext } from '../editor'

export type WordDecoratorProps = {
  decoratedText: string
  blockKey: string
  start: number
  end: number
  children: React.ReactChild
}

export const WordDecorator = (props: WordDecoratorProps) => {
  const { state, actions } = useOvermind()

  const editorContainer = React.useContext(EditorContext)
  const wordRef = React.useRef<HTMLSpanElement>()
  const bb = useWordBoundingBox(wordRef, editorContainer)

  const shouldCapitalize = isCaptialized(props.decoratedText)
  const word = props.decoratedText.toLowerCase()
  const { frequency, suggestions } = state.dictionary.infoFor(
    word,
    shouldCapitalize,
  )

  const open = state.editor.editorState
    .getSelection()
    .hasEdgeWithin(props.blockKey, props.start, props.end)

  let selectedIndex = -1

  if (open) {
    selectedIndex = state.editor.selectedIndex % suggestions.length
  }

  return (
    <>
      <Word
        open={open}
        ref={wordRef}
        title={
          frequency !== -1
            ? `${word}, frequency of ${frequency &&
                frequency.toFixed(3)} per 1M`
            : `${word}, loading...`
        }
      >
        {props.children}
      </Word>
      {bb &&
        ReactDOM.createPortal(
          <WordTag
            open={open}
            frequency={frequency}
            min={state.editor.minFrequency}
            max={state.editor.maxFrequency}
            width={bb.width}
            top={bb.top}
            left={bb.left}
            height={bb.height}
            role={open ? 'dialog' : undefined}
          >
            {suggestions.map((suggestion, i) => {
              const replace = () => {
                actions.editor.replaceText({
                  blockKey: props.blockKey,
                  start: props.start,
                  end: props.end,
                  replace: suggestion,
                })
              }
              return (
                <WordReplacement
                  tabIndex={1}
                  open={open}
                  editorHasFocus={state.editor.editorState
                    .getSelection()
                    .getHasFocus()}
                  key={suggestion}
                  className={cs({
                    selected: selectedIndex === i,
                  })}
                  onKeyDown={e => e.which === 13 && e.stopPropagation()}
                  onKeyUp={e => e.which === 13 && replace()}
                  onClick={replace}
                >
                  {suggestion}
                </WordReplacement>
              )
            })}
          </WordTag>,
          editorContainer && editorContainer.current,
        )}
    </>
  )
}
