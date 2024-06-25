import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Identifier } from '../identifier/index'
import { BinaryExpressionBuilder } from './binary/builder'
import { Expression } from './index'
import { UnaryExpression } from './unary'
import { SizeArray } from '../built-in/size'

export class AssignmentExpression {
  type = 'AssignmentExpression'

  left: Identifier | Expression

  operator?: string

  right?: Identifier | Expression

  constructor(parser: Parser, identifier?: Identifier | Expression) {
    this.left =
      identifier ?? (parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser))
    if (parser.nextToken?.type === '=') {
      this.operator = String(parser.validate(parser.nextToken?.type as any).value)
      if (String(parser.nextToken?.type) === Keyword.SIZE) {
        this.right = new SizeArray(parser)
        return
      }
      if (String(parser.nextToken?.type) === Keyword.ADDITIVE_OPERATOR) {
        this.right = new UnaryExpression(parser)
        return
      }
      const binaryBuilder = new BinaryExpressionBuilder(parser, identifier as Identifier)
      console.log(binaryBuilder, 'binaryBuilder')
      this.right = binaryBuilder.RelationalExpression()
    }
  }
}
