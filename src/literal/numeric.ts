import { Keyword } from '@parser/constants/keyword'
import { Node } from '@parser/interface/node'
import { Parser } from '@parser/parser'

export class NumericLiteral implements Node {
  type = 'NumericLiteral'

  value: number

  extra: {
    rawValue: number
    raw: string
  }

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.validate(Keyword.NUMBER)

    this.start = token.start
    this.end = token.end

    this.value = Number(token.value)

    this.extra = {
      rawValue: this.value,
      raw: String(token.value)
    }
  }
}
