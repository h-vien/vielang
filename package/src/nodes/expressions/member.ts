import { Parser } from '@parser/parser'
import { Expression } from './index'
import { Identifier } from '../identifier/index'

export class MemberExpression {
  type = 'MemberExpression'

  object: Expression

  property: Expression | null = null

  computed = false

  optional = false

  constructor(parser: Parser, object: Expression) {
    this.object = object
    console.log(object, 'this log')
    do {
      switch (parser.nextToken?.type) {
        case '[': {
          parser.validate('[')
          this.object = this.property ? { ...this } : { ...this.object }
          this.property = new Expression(parser)

          parser.validate(']')

          this.computed = true

          break
        }
        case '.': {
          parser.validate('.')
          this.object = this.property ? { ...this } : { ...this.object }
          this.property = new Identifier(parser)

          this.computed = false

          break
        }
      }
    } while (parser.nextToken?.type === '.' || parser.nextToken?.type === '[')
  }
}
