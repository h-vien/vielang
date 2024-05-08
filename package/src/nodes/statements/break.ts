import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Identifier } from '../identifier'

export class BreakStatement {
  type = 'BreakStatement'

  label: null | string

  constructor(parser: Parser) {
    parser.validate(Keyword.BREAK)
    let label: BreakStatement['label'] = null

    if (parser.nextToken?.type === Keyword.IDENTIFIER) {
      label = new Identifier(parser).name
    }

    this.label = label
  }
}
