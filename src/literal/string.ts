import { Keyword } from '@parser/constants/keyword'
import { Node } from '@parser/interface/node'
import { Parser } from '@parser/parser'

export class StringLiteral implements Node {
  type = 'StringLiteral'

  value: string

  extra: {
    rawValue: string
    raw: string
  }

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.validate(Keyword.STRING)

    this.start = token.start
    this.end = token.end

    const value = String(token.value).slice(1, -1)
    this.value = value

    this.extra = {
      rawValue: value,
      raw: JSON.stringify(String(value))
    }
  }
}
