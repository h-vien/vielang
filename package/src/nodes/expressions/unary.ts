import { Parser } from '@parser/parser'
import { Expression } from './index'

export class UnaryExpression {
  type = 'UnaryExpression'

  operator: string

  prefix: boolean

  argument: Expression

  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case 'delete':
      case 'void':
      case 'typeof':
      case '+':
      case '-':
      case '~':
      case '!': {
        this.operator = String(parser.validate(parser.nextToken?.type).value)
        this.prefix = true
        this.argument = new Expression(parser)
        break
      }
      default: {
        throw new Error('Invalid unary expression')
      }
    }
  }
}
