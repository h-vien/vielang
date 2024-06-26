import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { AssignmentExpression } from './assignment'
import { CallExpression } from './call'
import { MemberExpression } from './member'
import { UnaryExpression } from './unary'
import { PrefixUpdateExpression } from './update-expression/prefix-update'
import { SuffixUpdateExpression } from './update-expression/suffix-update'
import { ArrayExpression } from './array'
import { LabelledStatement } from '../statements/label'
import { ObjectExpression } from './object'
import { Literal } from '../literal/index'
import { Identifier } from '../identifier/index'
import { BinaryExpression } from './binary/index'
import { SizeArray } from '../built-in/size'

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
      case Keyword.SIZE: {
        Object.assign(this, new SizeArray(parser))
        break
      }
      case '{': {
        Object.assign(this, new ObjectExpression(parser))
        break
      }
      case '[': {
        Object.assign(this, new ArrayExpression(parser))
        break
      }
      case '++':
      case '--': {
        Object.assign(this, new PrefixUpdateExpression(parser))
        break
      }
      case 'delete':
      case 'void':
      case 'typeof':
      case '~':
      case '!':
      case Keyword.ADDITIVE_OPERATOR: {
        Object.assign(this, new UnaryExpression(parser))
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
          case '===':
          case Keyword.ADDITIVE_OPERATOR:
          case Keyword.MULTIPLICATIVE_OPERATOR:
          case Keyword.RELATIONAL_OPERATOR: {
            Object.assign(this, new BinaryExpression(parser, identifier))
            break
          }
          case ':': {
            Object.assign(this, new LabelledStatement(parser, identifier))
            break
          }
          case '++':
          case '--': {
            Object.assign(this, new SuffixUpdateExpression(parser, identifier))
            break
          }
          case '=': {
            Object.assign(this, new AssignmentExpression(parser, identifier))
            break
          }
          case '[':
          case '.': {
            const memberExpression = new MemberExpression(parser, identifier)

            switch (parser.nextToken?.type) {
              case '=': {
                Object.assign(this, new AssignmentExpression(parser, memberExpression))
                break
              }
              case '(': {
                Object.assign(this, new CallExpression(parser, memberExpression))
                break
              }
              default: {
                Object.assign(this, memberExpression)
                break
              }
            }
            break
          }
          case '(': {
            Object.assign(this, new CallExpression(parser, identifier))
            break
          }
          default: {
            Object.assign(this, identifier)
            break
          }
        }

        break
      }
      default: {
        break
      }
    }
  }
}
