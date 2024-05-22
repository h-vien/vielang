import { Keyword } from '@parser/constants/keyword'
import { Identifier } from '@parser/nodes/identifier/index'
import { Parser } from '@parser/parser'
import { Expression } from '../index'
import { BinaryExpressionBuilder } from './builder'
import { Operator } from '@parser/types/operator'
import { CLIENT_RENEG_LIMIT } from 'tls'

export class BinaryExpression {
  type = 'BinaryExpression'

  left: Identifier | Expression

  operator: string | undefined

  right: Identifier | Expression

  constructor(parser: Parser, identifier?: Identifier) {
    const binaryBuilder = new BinaryExpressionBuilder(parser)
    this.left =
      identifier ??
      (parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : binaryBuilder.AdditiveExpression())
    switch (parser.nextToken?.type) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case '**':
      case '^':
      case '>':
      case '>>':
      case '>>>':
      case '<':
      case '<<':
      case '<<<':
      case '>=':
      case '<=':
      case '==':
      case '===': {
        this.operator = String(parser.validate(parser.nextToken?.type).value)
        break
      }
    }

    this.right = new Expression(parser)
  }
}
