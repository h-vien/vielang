import { Parser } from '@parser/parser'
import { ObjectPropertyList } from '../initializers/object/property-list'

export class ObjectLiteral {
  type = 'ObjectLiteral'

  properties: ObjectPropertyList['properties'] = []

  constructor(parser: Parser) {
    parser.validate('{')

    this.properties = new ObjectPropertyList(parser).properties

    parser.validate('}')
  }
}
