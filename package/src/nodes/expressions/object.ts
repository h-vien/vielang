import { Parser } from '@parser/parser'
import { ObjectLiteral } from '../literal/object'

export class ObjectExpression {
  type = 'ObjectExpression'

  properties: ObjectLiteral['properties'] = []

  constructor(parser: Parser) {
    this.properties = new ObjectLiteral(parser).properties
  }
}
