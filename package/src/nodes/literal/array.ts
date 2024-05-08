import { Parser } from '@parser/parser'
import { Expression } from '../expressions'
import { ArrayElementList } from '../initializers/array'

export class ArrayLiteral {
  type = 'ArrayLiteral'

  elements: Array<Expression>

  constructor(parser: Parser) {
    parser.validate('[')

    this.elements = new ArrayElementList(parser, ']').elements

    parser.validate(']')
  }
}
