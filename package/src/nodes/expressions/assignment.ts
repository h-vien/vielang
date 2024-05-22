import { Parser } from '@parser/parser'
import { Keyword } from '@parser/constants/keyword'
import { Identifier } from '../identifier/index'
import { Expression } from './index'
import { BinaryExpression } from './binary/index'

export class AssignmentExpression {
  type = 'AssignmentExpression'

  left: Identifier | Expression

  operator?: string

  right?: Identifier | Expression

  constructor(parser: Parser, identifier?: Identifier | Expression) {
    this.left =
      identifier ?? (parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser))

    while (parser.nextToken?.type === '=') {
      this.operator = String(parser.validate('=').value)
      this.right = new BinaryExpression(parser)
      return
    }
  }
}
