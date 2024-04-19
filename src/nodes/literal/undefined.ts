import { Keyword } from '@parser/constants/keyword'
import { Node } from '@parser/interface/node'
import { Parser } from '@parser/parser'

export class UndefinedLiteral implements Node {
  type = 'UndefinedLiteral'

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.validate(Keyword.UNDEFINED)

    this.start = token.start
    this.end = token.end
  }
}
