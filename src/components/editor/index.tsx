import * as React from 'react'
import 'draft-js/dist/Draft.css'

import { useOvermind } from '../../overmind'
import { Editor, EditorProps, getDefaultKeyBinding } from 'draft-js'
import {
  EditorContainer,
  EditorControls,
  EditorButton,
  EditorInput,
  EditorLabel,
  OuterEditorContainer,
} from './elements'
import { FullWidthColumn, Row } from '../flex'
import { ErrorMessage, ErrorBoundary } from '../error'
import { useSelectionKeybindings } from '../../hooks'

export const EditorContext = React.createContext<React.RefObject<
  HTMLElement
> | null>(null)

export const TyprEditor = () => {
  const { actions, state } = useOvermind()
  const editorContainer = React.useRef<HTMLDivElement>(null)

  return (
    <OuterEditorContainer>
      {state.app.isError && <ErrorMessage error={state.app.error} />}
      <ErrorBoundary>
        <EditorContainer isError={state.app.isError} ref={editorContainer}>
          <EditorContext.Provider value={editorContainer}>
            <Editor
              placeholder="type here..."
              editorState={state.editor.editorState}
              onChange={actions.editor.updateEditorState}
              keyBindingFn={useSelectionKeybindings()}
              handleKeyCommand={command => {
                if (command === 'suggestion-selection') {
                  return 'handled'
                }

                return 'not-handled'
              }}
            />
          </EditorContext.Provider>
          <EditorControls>
            <Row>
              <EditorLabel htmlFor="maxFrequency">
                underline threshold:
              </EditorLabel>
              <EditorInput
                type="number"
                step={100}
                min={0}
                max={1e6}
                value={state.editor.maxFrequency}
                onChange={e =>
                  actions.editor.changeMaxFrequency(e.target.valueAsNumber)
                }
              />
              <EditorButton onClick={() => actions.editor.setTextToQuote()}>
                random quote
              </EditorButton>
            </Row>
            <Row>{state.editor.characterCount} / 241 characters</Row>
          </EditorControls>
        </EditorContainer>
      </ErrorBoundary>
    </OuterEditorContainer>
  )
}
