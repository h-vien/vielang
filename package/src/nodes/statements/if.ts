import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { BlockStatement } from './block'
import { Identifier } from '../identifier/index'
import { Expression } from '../expressions/index'
import { Statement } from './index'

export class IfStatement {
  type = 'IfStatement'
  test: Identifier | Expression
  consequent: BlockStatement | Statement
  alternate?: BlockStatement | Statement
  constructor(parser: Parser) {
    parser.validate(Keyword.IF)
    parser.validate('(')
    this.test = new Expression(parser)
    parser.validate(')')

    this.consequent = parser.nextToken?.type === '{' ? new BlockStatement(parser) : new Statement(parser)
    if (parser.nextToken?.type === Keyword.ELSE) {
      parser.validate(Keyword.ELSE)
      this.alternate = parser.nextToken?.type === '{' ? new BlockStatement(parser) : new Statement(parser)
    }
  }
}
