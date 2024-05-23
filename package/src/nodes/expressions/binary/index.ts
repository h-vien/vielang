import { Keyword } from '@parser/constants/keyword'
import { Identifier } from '@parser/nodes/identifier/index'
import { Parser } from '@parser/parser'
import { Expression } from '../index'
import { BinaryExpressionBuilder } from './builder'

export class BinaryExpression {
  type = 'BinaryExpression'

  left: Identifier | Expression

  operator?: string

  right?: Identifier | Expression

  constructor(parser: Parser, identifier?: Identifier) {
    this.left =
      identifier ?? (parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser))

    while (
      [Keyword.RELATIONAL_OPERATOR, Keyword.ADDITIVE_OPERATOR, Keyword.MULTIPLICATIVE_OPERATOR].includes(
        parser.nextToken?.type as Keyword
      )
    ) {
      this.operator = String(parser.validate(parser.nextToken?.type as any).value)
      const binaryBuilder = new BinaryExpressionBuilder(parser, identifier)

      this.right = binaryBuilder.RelationalExpression()
    }
  }
}
