import nlp from 'compromise'
import { AsyncAction } from 'overmind'

export const fetchWord: AsyncAction<string> = async (
  { state, effects, actions },
  word: string,
) => {
  if (
    !state.dictionary.words[word] ||
    (state.dictionary.words[word].info &&
      !state.dictionary.words[word].info.suggestions)
  ) {
    const infoArr = await effects.dictionary.fetchInfo(word)

    state.dictionary.words = infoArr.reduce(
      (acc, info) => ({
        ...acc,
        [info.word]: info,
      }),
      state.dictionary.words,
    )
  }
}
