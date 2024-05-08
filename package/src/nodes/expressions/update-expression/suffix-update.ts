import { Parser } from '@parser/parser'
import { Keyword } from '@parser/constants/keyword'
import { Identifier } from '@parser/nodes/identifier'

export class SuffixUpdateExpression {
  type = 'UpdateExpression'

  operator?: string

  argument?: Identifier

  prefix?: boolean

  constructor(parser: Parser, identifier: Identifier) {
    if (parser.nextToken?.type === '++' || parser.nextToken?.type === '--') {
      this.argument = identifier

      this.prefix = false
      this.operator = String(parser.validate(parser.nextToken.type).value)
    } else {
      throw Error('Invalid token')
    }
  }
}
