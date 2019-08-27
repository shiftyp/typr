import { WordInfo, Info } from '../../types'
import { Derive } from 'overmind'
import { capitalize } from '../../utils'

export type State = {
  words: { [key: string]: WordInfo }
  infoFor: Derive<State, (word: string, shouldCapitalize: boolean) => Info>
}

export const state: State = {
  words: {},
  infoFor: state => (word, shouldCapitalize) => {
    const wordInfo: WordInfo = state.words[word] || ({} as WordInfo)
    const info: Info = wordInfo.info || ({} as Info)
    let { frequency = -1, suggestions = [] } = info

    if (shouldCapitalize) {
      suggestions = suggestions.map(capitalize)
    }

    return {
      frequency,
      suggestions,
    }
  },
}
