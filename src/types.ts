export type Info = {
  frequency?: number
  suggestions?: string[]
}

export type WordInfo = {
  word: string
  info?: Info
}

export type WordInfoMap = {
  [key: string]: WordInfo
}

export type Token = {
  blockKey: string
  isCapitalized: boolean
  word: string
  start: number
  end: number
}

export type Quote = {
  quoteText: string
  quoteAuthor: string
  quoteLink: string
}
