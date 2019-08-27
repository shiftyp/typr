import * as React from 'react'
import { useOvermind } from '../overmind'
import { EditorProps, getDefaultKeyBinding } from 'draft-js'
import { getRelativeBoundingBox } from '../utils'

export const useWordBoundingBox = (
  wordRef: React.RefObject<HTMLElement>,
  editorContainerRef: React.RefObject<HTMLElement> | null,
) => {
  const [bb, setBB] = React.useState<ClientRect | null>(null)

  const updateBB = () => {
    if (
      wordRef.current &&
      editorContainerRef !== null &&
      editorContainerRef.current
    ) {
      const updated = getRelativeBoundingBox(wordRef, editorContainerRef)

      if (
        (updated && !bb) ||
        ['top', 'right', 'bottom', 'left'].find(
          prop => bb[prop] !== updated[prop],
        )
      ) {
        setBB(updated)
      }
    }
  }

  React.useEffect(() => {
    updateBB()
    window.addEventListener('resize', updateBB)
    return () => window.removeEventListener('resize', updateBB)
  })

  return bb
}

export const useSelectionKeybindings = (): EditorProps['keyBindingFn'] => {
  const { state, actions } = useOvermind()

  return e => {
    if (e.keyCode === 38) {
      const token = state.editor.activeToken
      if (token) {
        const info = state.dictionary.infoFor(
          state.editor.activeToken.word,
          token.isCapitalized,
        )
        const suggestions = info.suggestions
        if (suggestions.length) {
          actions.editor.moveSelectedIndex(true)
          return 'suggestion-selection'
        }
      }
    } else if (e.keyCode === 40) {
      const token = state.editor.activeToken
      if (token) {
        const info = state.dictionary.infoFor(
          state.editor.activeToken.word,
          token.isCapitalized,
        )
        const suggestions = info.suggestions
        if (suggestions.length) {
          actions.editor.moveSelectedIndex(false)
          return 'suggestion-selection'
        }
      }
    } else if (e.keyCode === 13) {
      const token = state.editor.activeToken
      if (token) {
        const info = state.dictionary.infoFor(
          state.editor.activeToken.word,
          token.isCapitalized,
        )
        const suggestions = info.suggestions
        if (suggestions.length && state.editor.selectedIndex !== -1) {
          const suggestion =
            suggestions[state.editor.selectedIndex % suggestions.length]

          actions.editor.replaceText({
            blockKey: token.blockKey,
            replace: suggestion,
            start: token.start,
            end: token.end,
          })

          return 'suggestion-selection'
        }
      }
    }

    return getDefaultKeyBinding(e)
  }
}
