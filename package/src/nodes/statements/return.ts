import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Expression } from '../expressions/index'

export class ReturnStatement {
  type = 'ReturnStatement'
  argument: Expression | null

  constructor(parser: Parser) {
    parser.validate(Keyword.RETURN)

    const expression = new Expression(parser)

    this.argument = Object.keys(expression).length === 0 ? null : expression
  }
}
