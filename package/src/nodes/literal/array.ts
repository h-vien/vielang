import { Parser } from '@parser/parser'
import { ArrayElementList } from '../initializers/array'
import { Expression } from '../expressions/index'

export class ArrayLiteral {
  type = 'ArrayLiteral'

  elements: Array<Expression>

  constructor(parser: Parser) {
    parser.validate('[')

    this.elements = new ArrayElementList(parser, ']').elements

    parser.validate(']')
  }
}
