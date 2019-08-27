import fetch from 'node-fetch'
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

const makeKey = () => (Math.random() * 10000).toFixed(0)

export const handler: Handler<
  APIGatewayEvent,
  APIGatewayProxyResult
> = async event => {
  const resp = await fetch(
    `http://api.forismatic.com/api/1.0/?method=getQuote&key=${makeKey()}&format=json&lang=en`,
  )
  const data = await resp.json()

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
