import { Parser } from '@parser/parser'
import { ArrayLiteral } from '../literal/array'
import { Expression } from './index'

export class ArrayExpression {
  type = 'ArrayExpression'

  elements: Array<Expression>

  constructor(parser: Parser) {
    this.elements = new ArrayLiteral(parser).elements
  }
}
