import { Parser } from '@parser/parser'
import { Keyword } from '@parser/constants/keyword'
import { Identifier } from '@parser/nodes/identifier'

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
