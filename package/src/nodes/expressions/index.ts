import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Literal } from '../literal'
import { Identifier } from '../identifier'
import { BinaryExpression } from './binary'
import { AssignmentExpression } from './assignment'
import { FunctionDeclaration } from '../declarations/function'

export class Expression {
  [key: string]: any

  constructor(parser: Parser) {
    switch (parser.nextToken?.type as string) {
      case Keyword.NUMBER:
      case Keyword.STRING:
      case Keyword.BOOLEAN:
      case Keyword.NAN:
      case Keyword.NULL:
      case Keyword.UNDEFINED: {
        Object.assign(this, new Literal(parser))
        break
      }
      case Keyword.FUNCTION: {
        Object.assign(this, new FunctionDeclaration(parser))
        break
      }

      case Keyword.IDENTIFIER: {
        const identifier = new Identifier(parser)

        switch (parser.nextToken?.type as string) {
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
            Object.assign(this, new BinaryExpression(parser, identifier))
            break
          }
          case '=': {
            Object.assign(this, new AssignmentExpression(parser, identifier))
            break
          }

          default: {
            Object.assign(this, identifier)
            break
          }
        }

        break
      }
    }
  }
}
