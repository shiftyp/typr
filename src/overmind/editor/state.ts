import { Derive } from 'overmind'
import { Token } from '../../types'
import { EditorState } from 'draft-js'
import { isCaptialized } from '../../utils'

export type State = {
  content: { [key: string]: string }
  editorState: EditorState
  minFrequency: number
  maxFrequency: number
  selectedIndex: number
  characterCount: Derive<State, number>
  activeToken: Derive<State, Token | null>
  tokensForBlock: Derive<State, (blockKey: string) => Token[]>
  tokens: Derive<State, { [key: string]: Token[] }>
}

export const state: State = {
  content: {},
  editorState: EditorState.createEmpty(),
  minFrequency: 0,
  maxFrequency: 500,
  selectedIndex: 0,
  activeToken: state => {
    const selection = state.editorState.getSelection()
    const blockKey = selection.getFocusKey()

    const tokens = state.tokensForBlock(blockKey)

    return tokens.find(token =>
      selection.hasEdgeWithin(blockKey, token.start, token.end),
    )
  },
  tokensForBlock: state => blockKey => {
    return state.tokens[blockKey] || []
  },
  characterCount: state =>
    state.editorState.getCurrentContent().getPlainText().length,
  tokens: state => {
    return Object.keys(state.content).reduce((acc, key) => {
      const text = state.content[key]

      return {
        ...acc,
        [key]: text
          .split(/[^\w']+/g)
          .slice(0, -1)
          .reduce(
            ({ last, tokens }, rawWord) => {
              const word = rawWord.toLowerCase()
              const offset = text.substring(last).indexOf(rawWord) + last

              return {
                tokens: [
                  ...tokens,
                  {
                    blockKey: key,
                    word,
                    start: offset,
                    end: offset + word.length,
                    isCapitalized: isCaptialized(rawWord),
                  },
                ],
                last: offset + word.length,
              }
            },
            { last: 0, tokens: [] },
          ).tokens,
      }
    }, {})
  },
}
