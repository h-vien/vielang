import { Parser } from '@parser/parser'
import { Identifier } from '../identifier'
import { BlockStatement } from '../statements/block'
import { Keyword } from '@parser/constants/keyword'

export class FunctionExpression {
  type = 'FunctionExpression'

  id: null

  expression = false

  generator = false

  async = false

  params: Array<Identifier> = []

  body: BlockStatement

  constructor(parser: Parser, ignoreFunctionKeyword = false) {
    if (parser.nextToken?.type === Keyword.ASYNC) {
      parser.validate(Keyword.ASYNC)
      this.async = true
    }

    if (!ignoreFunctionKeyword) {
      parser.validate(Keyword.FUNCTION)
    }

    if (parser.nextToken?.type === '*') {
      parser.validate('*')
      this.generator = true
    }

    parser.validate('(')

    const parameters: Array<Identifier> = []

    while (parser.nextToken?.type !== ')') {
      if (parameters.length > 0) {
        parser.validate(',')
      }

      parameters.push(new Identifier(parser))
    }

    parser.validate(')')

    const body = new BlockStatement(parser)

    this.id = null
    this.expression = false
    this.params = parameters
    this.body = body
  }
}
