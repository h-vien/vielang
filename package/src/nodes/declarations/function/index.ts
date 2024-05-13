import { Keyword } from '@parser/constants/keyword'
import { BlockStatement } from '@parser/nodes/statements/block'
import { Parser } from '@parser/parser'
import { Parameter } from './parameter'
import { Identifier } from '@parser/nodes/identifier/index'

export class FunctionDeclaration {
  type = 'FunctionDeclaration'
  async = false

  id: Identifier

  params: Array<Identifier>

  body: BlockStatement

  constructor(parser: Parser) {
    if (parser.nextToken?.type === Keyword.ASYNC) {
      parser.validate(Keyword.ASYNC)
      this.async = true
    }
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
