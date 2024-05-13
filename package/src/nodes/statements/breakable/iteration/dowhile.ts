import { Parser } from '@parser/parser'
import { BlockStatement } from '../../block'
import { Keyword } from '@parser/constants/keyword'
import { Expression } from '@parser/nodes/expressions/index'

export class DoWhileStatement {
  type = 'DoWhileStatement'

  body: BlockStatement

  test: Expression

  constructor(parser: Parser) {
    parser.validate(Keyword.DO)

    this.body = new BlockStatement(parser)

    parser.validate(Keyword.WHILE)

    parser.validate('(')

    this.test = new Expression(parser)

    parser.validate(')')
  }
}
