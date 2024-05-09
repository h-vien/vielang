import { Expression } from '@parser/nodes/expressions'
import { Identifier } from '@parser/nodes/identifier'
import { Parser } from '@parser/parser'

export class ObjectProperty {
  type = 'ObjectProperty'

  method = false

  computed = false

  key: Identifier | Expression

  value: null | Expression

  constructor(parser: Parser) {
    if (parser.nextToken?.type === '[') {
      parser.validate('[')
      this.key = new Expression(parser)
      this.computed = true
      parser.validate(']')
    } else {
      this.key = new Identifier(parser)
    }

    if (parser.nextToken?.type === ':') {
      parser.validate(':')
      this.value = new Expression(parser)
    } else {
      this.value = null
    }
  }
}
