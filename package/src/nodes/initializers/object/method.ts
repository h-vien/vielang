import { Keyword } from '@parser/constants/keyword'
import { Expression } from '@parser/nodes/expressions'
import { FunctionExpression } from '@parser/nodes/expressions/function'
import { Identifier } from '@parser/nodes/identifier'
import { Parser } from '@parser/parser'

export class ObjectMethod {
  type = 'ObjectMethod'

  method = true

  key: Identifier | Expression

  computed = false

  kind: 'method' | 'get' | 'set' = 'method'

  generator = false

  async = false

  params: FunctionExpression['params'] = []

  body: FunctionExpression['body']

  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.GET: {
        parser.validate(Keyword.GET)
        this.kind = 'get'
        this.method = false
        break
      }
      case Keyword.SET: {
        parser.validate(Keyword.SET)
        this.kind = 'set'
        this.method = false
        break
      }
      case Keyword.ASYNC: {
        parser.validate(Keyword.ASYNC)
        this.async = true
        break
      }
    }

    if (parser.nextToken?.type === '[') {
      parser.validate('[')
      this.key = new Expression(parser)
      this.computed = true
      parser.validate(']')
    } else {
      this.key = new Identifier(parser)
    }

    const functionExpression = new FunctionExpression(parser, true)

    this.generator = functionExpression.generator
    this.params = functionExpression.params
    this.body = functionExpression.body
  }
}
