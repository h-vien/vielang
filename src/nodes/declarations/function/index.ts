import { Keyword } from '@parser/constants/keyword'
import { Identifier } from '@parser/nodes/identifier'
import { BlockStatement } from '@parser/nodes/statements/block'
import { Parser } from '@parser/parser'
import { Parameter } from './parameter'

export class FunctionDeclaration {
  type = 'FunctionDeclaration'

  id: Identifier

  params: Array<Identifier>

  body: BlockStatement

  constructor(parser: Parser) {
    parser.validate(Keyword.FUNCTION)
    const name = String(new Identifier(parser).name)
    parser.validate('(')
    const params: Array<Identifier> = new Parameter(parser, ')').parameters

    parser.validate(')')

    const body = new BlockStatement(parser)

    this.id = {
      type: Keyword.IDENTIFIER,
      name
    }

    this.params = params
    this.body = body
  }
}
