import { Keyword } from '@parser/constants/keyword'
import { Expression } from '@parser/nodes/expression'
import { Identifier } from '@parser/nodes/identifier'
import { Parser } from '@parser/parser'

export class VariableDeclarator {
  type = 'VariableDeclarator'

  init: Expression = {
    type: Keyword.IDENTIFIER,
    name: 'undefined'
  }
  id: Identifier

  constructor(parser: Parser, isConstant = false) {
    const identifier = new Identifier(parser)

    if (isConstant || parser.nextToken?.type === '=') {
      parser.validate('=')
      this.init = new Expression(parser)
    }

    this.id = identifier
  }
}
