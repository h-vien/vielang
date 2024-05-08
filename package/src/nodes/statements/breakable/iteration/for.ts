// import { ForInOfStatement } from "./ForInOfStatement";

import { Parser } from '@parser/parser'
import { Statement } from '../..'
import { VariableDeclaration } from '../../../declarations/variable/declaration'
import { Expression } from '../../../expressions'
import { Identifier } from '../../../identifier'
import { BlockStatement } from '../../block'
import { Keyword } from '@parser/constants/keyword'

export class ForStatement {
  type = 'ForStatement'

  init: VariableDeclaration | Identifier

  test: Expression

  update?: Expression

  body: Statement | BlockStatement

  constructor(parser: Parser) {
    parser.validate(Keyword.FOR)

    let isAsync = false

    if (parser.nextToken?.type === Keyword.AWAIT) {
      parser.validate(Keyword.AWAIT)
      isAsync = true
    }

    parser.validate('(')

    if (!isAsync && parser.nextToken?.type !== Keyword.IN && parser.nextToken?.type !== Keyword.OF) {
      switch (parser.nextToken?.type) {
        case Keyword.VAR:
        case Keyword.LET: {
          this.init = new VariableDeclaration(parser)
          break
        }
        case Keyword.CONST: {
          throw new Error('Const declarations are not allowed in for loops')
        }
        default: {
          // TODO: LexicalDeclaration instead of Identifier
          this.init = new Identifier(parser)
          break
        }
      }

      parser.validate(';')

      this.test = new Expression(parser)
      if (parser.nextToken?.type === ';') {
        parser.validate(';')
      }

      if (parser.nextToken?.type !== ')') {
        this.update = new Expression(parser)
      }
    } else {
      throw new Error('For loop with in or of is not implemented')
    }

    parser.validate(')')

    this.body = parser.nextToken?.type === '{' ? new BlockStatement(parser) : new Statement(parser)
  }
}
