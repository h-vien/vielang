import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Identifier } from './identifier'
import { Expression } from './expressions'
import { BlockStatement } from './statements/block'
import { Statement } from './statements'

export class IfStatement {
  type = 'IfStatement'
  condition: Identifier | Expression
  consequent: BlockStatement | Statement

  constructor(parser: Parser) {
    parser.validate(Keyword.IF)
    parser.validate('(')
    this.condition = new Expression(parser)
    parser.validate(')')

    this.consequent = parser.nextToken?.type === '{' ? new BlockStatement(parser) : new Statement(parser)
  }
}
