import { Parser } from '@parser/parser'
import { Identifier } from '../identifier/index'
import { Expression } from '../expressions/index'
import { Keyword } from '@parser/constants/keyword'

export class SizeArray {
  type = 'MemberExpression'

  object: Expression

  property: Expression | null = null

  computed = false

  optional = false

  constructor(parser: Parser) {
    parser.validate(Keyword.SIZE)
    parser.validate('(')
    this.object = new Identifier(parser)
    this.property = {
      type: 'Identifier',
      name: 'length'
    }
    parser.validate(')')
  }
}
