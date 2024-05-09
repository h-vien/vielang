import { Keyword } from '@parser/constants/keyword'
import { ObjectMethod } from './method'
import { Parser } from '@parser/parser'
import { ObjectProperty } from './property'

export class ObjectPropertyList {
  properties: Array<ObjectProperty | ObjectMethod> = []

  constructor(parser: Parser, stopToken = '}') {
    while (parser.nextToken?.type !== stopToken) {
      switch (parser.nextToken?.type) {
        case Keyword.GET:
        case Keyword.SET:
        case Keyword.ASYNC: {
          this.properties.push(new ObjectMethod(parser))
          break
        }
        default: {
          this.properties.push(new ObjectProperty(parser))
        }
      }

      if (parser.nextToken?.type !== stopToken) {
        parser.validate(',')
      }
    }
  }
}
