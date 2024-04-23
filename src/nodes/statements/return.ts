import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Expression } from '../expressions'

export class ReturnStatement {
  type = 'ReturnStatement'
  argument: Expression

  constructor(parser: Parser) {
    parser.validate(Keyword.RETURN)

    const expression = new Expression(parser)
    this.argument = expression
  }
}
