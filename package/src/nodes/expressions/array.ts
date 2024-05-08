import { Parser } from '@parser/parser'
import { Expression } from '.'
import { ArrayLiteral } from '../literal/array'

export class ArrayExpression {
  type = 'ArrayExpression'

  elements: Array<Expression>

  constructor(parser: Parser) {
    this.elements = new ArrayLiteral(parser).elements
  }
}
