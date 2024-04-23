import { Keyword } from '@parser/constants/keyword'
import { Node } from '@parser/interface/node'
import { Parser } from '@parser/parser'

export class BooleanLiteral implements Node {
  type = 'BooleanLiteral'

  value: boolean

  start: number

  end: number

  constructor(parser: Parser) {
    const token = parser.validate(Keyword.BOOLEAN)

    this.start = token.start
    this.end = token.end

    if (token.value === 'true' || token.value === 'đúng') {
      this.value = true
    } else {
      this.value = false
    }
  }
}
