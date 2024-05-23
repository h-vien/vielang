import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'

export class Identifier {
  type = 'Identifier'

  name: string

  constructor(parser: Parser) {
    const res = parser.validate(Keyword.IDENTIFIER)?.value
    this.name = String(res)
      .replace(/[^\sA-Za-z]/g, (match) => {
        // Find vietnamese character and replace
        return `_${match?.codePointAt(0)}`
      })
      .replace(/\s/g, '_')
  }
}
