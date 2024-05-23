import { Parser } from '@parser/parser'
import { ObjectLiteral } from '../literal/object'
import { Expression } from './index'

export class ParenthesizedExpression {
  type = 'ParenthesizedExpression'
  expression: Expression

  constructor(parser: Parser) {
    parser.validate('(')
    this.expression = new Expression(parser)
    parser.validate(')')
  }
}
