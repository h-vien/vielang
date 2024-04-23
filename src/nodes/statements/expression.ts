import { Parser } from '@parser/parser'
import { Expression } from '../expressions'

export class ExpressionStatement {
  type = 'ExpressionStatement'

  expression: Expression

  constructor(parser: Parser) {
    this.expression = new Expression(parser)
  }
}
