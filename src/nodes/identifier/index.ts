import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'

export class Identifier {
  type = 'Identifier'

  name: string

  constructor(parser: Parser) {
    const name = String(parser.validate(Keyword.IDENTIFIER)?.value)
    this.name = name
  }
}
