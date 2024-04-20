import { Parser } from '@parser/parser'
import { Identifier } from '../identifier'
import { Expression } from '.'
import { Keyword } from '@parser/constants/keyword'

export class AssignmentExpression {
  type = 'AssignmentExpression'

  left: Identifier | Expression

  operator: string

  right: Identifier | Expression

  constructor(parser: Parser, identifier?: Identifier | Expression) {
    this.left =
      identifier ?? (parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser))

    this.operator = String(parser.validate('=').value)

    this.right = parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser)
  }
}
