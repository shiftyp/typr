import { WordInfo } from '../../types'
import { makeFetch } from '../../utils'

export const fetchInfo = makeFetch<WordInfo[], [string]>(
  (word: string) => `/.netlify/functions/info?word=${word}`,
)
