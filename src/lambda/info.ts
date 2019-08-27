import datamuse from 'datamuse'
import { WordInfo } from '../types'
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

const getFrequency = (datum: any) => {
  const val = datum.tags && datum.tags.find(item => item.startsWith('f:'))

  if (val) {
    return parseFloat(val.substr(2))
  }

  return null
}

export const handler: Handler<
  APIGatewayEvent,
  APIGatewayProxyResult
> = async event => {
  const { word } = event.queryStringParameters

  const data = await datamuse.words({
    rel_syn: word,
    qe: 'rel_syn',
    md: 'f',
  })

  const wordInfoMap = data.reduce(
    (acc, datum) => ({
      [datum.word]: {
        word: datum.word,
        info: {
          frequency: getFrequency(datum),
        },
      } as WordInfo,
      ...acc,
    }),
    {},
  )

  const thresholdFrequency = wordInfoMap[word].info.frequency

  const wordInfo = Object.keys(wordInfoMap)
    .reduce((acc, key) => {
      const info = wordInfoMap[key]
      if (info.info.frequency >= thresholdFrequency) {
        return [...acc, info]
      }
      return acc
    }, [])
    .sort((a, b) => a.info.frequency - b.info.frequency)

  wordInfoMap[word].info.suggestions = wordInfo
    .map(info => info.word)
    .filter(suggestion => suggestion !== word)

  return {
    statusCode: 200,
    body: JSON.stringify(wordInfo),
  }
}
