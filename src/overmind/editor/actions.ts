import { Action, AsyncAction } from 'overmind'
import {
  EditorState,
  SelectionState,
  Modifier,
  ContentState,
  CompositeDecorator,
  ContentBlock,
} from 'draft-js'
import { ErrorType } from '../../errors'
import { WordDecorator } from '../../components/word_decorator'

const satisfiesMaxLength = (editorState: EditorState) => {
  return editorState.getCurrentContent().getPlainText().length <= 241
}

export const performTokenStrategy: Action<
  [ContentBlock, (start: number, end: number) => void]
> = ({ state }, [contentBlock, callback]) => {
  const words = state.editor.tokensForBlock(contentBlock.getKey())

  words.forEach(token => callback(token.start, token.end))
}

export const updateEditorState: Action<EditorState> = (
  { state, actions },
  editorState,
) => {
  if (satisfiesMaxLength(editorState)) {
    actions.app.clearError(ErrorType.CONTENT_TOO_LONG)

    state.editor.content = editorState
      .getCurrentContent()
      .getBlockMap()
      .reduce(
        (acc, block, key) => ({
          ...acc,
          [key]: block.getText(),
        }),
        {},
      )

    state.editor.editorState = EditorState.set(editorState, {
      decorator: new CompositeDecorator([
        {
          strategy: (block, cb) =>
            actions.editor.performTokenStrategy([block, cb]),
          component: WordDecorator,
        },
      ]),
    })

    Object.keys(state.editor.tokens).forEach(key => {
      const tokenArr = state.editor.tokens[key]
      tokenArr.forEach(token => actions.dictionary.fetchWord(token.word))
    })
  } else {
    state.editor.editorState = EditorState.set(editorState, {
      decorator: null,
    }) as EditorState
    actions.app.setError(ErrorType.CONTENT_TOO_LONG)
  }

  state.editor.selectedIndex = 0
}

export const changeMinFrequency: Action<number> = ({ state }, min) => {
  state.editor.minFrequency = min
}

export const changeMaxFrequency: Action<number> = ({ state }, max) => {
  state.editor.maxFrequency = max
}

export const replaceText: Action<{
  blockKey: string
  start: number
  end: number
  replace: string
}> = ({ state, actions }, { blockKey, start, end, replace }) => {
  const nextContentState = Modifier.replaceText(
    state.editor.editorState.getCurrentContent(),
    SelectionState.createEmpty(blockKey).merge({
      anchorOffset: start,
      focusOffset: end,
    }) as SelectionState,
    replace,
  )

  actions.editor.updateEditorState(
    EditorState.push(
      state.editor.editorState,
      nextContentState,
      'insert-fragment',
    ),
  )
}

export const setText: Action<string> = ({ state, actions }, text) => {
  actions.editor.updateEditorState(
    EditorState.moveFocusToEnd(
      EditorState.push(
        state.editor.editorState,
        ContentState.createFromText(text),
        'insert-fragment',
      ),
    ),
  )
}

export const setTextToQuote: AsyncAction = async ({ effects, actions }) => {
  try {
    const quote = await effects.editor.fetchQuote()

    actions.editor.setText(quote.quoteText)
    actions.app.clearError(ErrorType.NETWORK)
  } catch (e) {
    actions.app.setError(ErrorType.NETWORK)
  }
}

export const moveSelectedIndex: Action<boolean> = (
  { state },
  isUp: boolean,
) => {
  if (isUp) {
    state.editor.selectedIndex--
    return
  }

  state.editor.selectedIndex++
}
