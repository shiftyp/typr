import { Quote } from '../../types'
import { makeFetch } from '../../utils'

export const fetchQuote = makeFetch<Quote>('/.netlify/functions/quote')
