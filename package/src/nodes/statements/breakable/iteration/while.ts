import { Parser } from '@parser/parser'
import { BlockStatement } from '../../block'
import { Expression } from '@parser/nodes/expressions'
import { Keyword } from '@parser/constants/keyword'

export class WhileStatement {
  type = 'WhileStatement'

  body: BlockStatement

  test: Expression

  constructor(parser: Parser) {
    parser.validate(Keyword.WHILE)

    parser.validate('(')

    this.test = new Expression(parser)

    parser.validate(')')
    this.body = new BlockStatement(parser)
  }
}
