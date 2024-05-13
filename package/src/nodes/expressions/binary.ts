import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Identifier } from '../identifier/index'
import { Expression } from './index'

export class BinaryExpression {
  type = 'BinaryExpression'

  left: Identifier | Expression

  operator: string | undefined

  right: Identifier | Expression

  constructor(parser: Parser, identifier?: Identifier) {
    const hasMoreOperator = parser.tokenizer.hasMoreOperator()

    console.log('parser.nextToken?.type', parser.nextToken)
    this.left =
      identifier ?? (parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser))
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
