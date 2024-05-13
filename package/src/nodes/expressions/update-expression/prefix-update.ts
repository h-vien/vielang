import { Identifier } from '@parser/nodes/identifier/index'
import { Parser } from '@parser/parser'

export class PrefixUpdateExpression {
  type = 'UpdateExpression'

  operator?: string

  argument?: Identifier

  prefix?: boolean

  constructor(parser: Parser) {
    if (parser.nextToken?.type === '++' || parser.nextToken?.type === '--') {
      this.prefix = true
      this.operator = String(parser.validate(parser.nextToken.type).value)
      this.argument = new Identifier(parser)
    }
  }
}
