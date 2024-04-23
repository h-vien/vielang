import { Keyword } from '@parser/constants/keyword'
import { Node } from '@parser/interface/node'
import { Parser } from '@parser/parser'

export class NullLiteral implements Node {
  type = 'NullLiteral'

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.validate(Keyword.NULL)

    this.start = token.start
    this.end = token.end
  }
}
