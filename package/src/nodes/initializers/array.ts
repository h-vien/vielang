import { Parser } from '@parser/parser'
import { Expression } from '../expressions'

export class ArrayElementList {
  type = 'ArrayElementList'

  elements: Array<Expression> = []

  constructor(parser: Parser, stopToken = ']') {
    while (parser.nextToken?.type !== stopToken) {
      this.elements.push(new Expression(parser))

      if (parser.nextToken?.type !== stopToken) {
        parser.validate(',')
      }
    }
  }
}
