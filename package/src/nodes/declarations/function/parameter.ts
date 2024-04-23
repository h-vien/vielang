import { Identifier } from '@parser/nodes/identifier'
import { Parser } from '@parser/parser'

export class Parameter {
  parameters: Array<Identifier> = []

  constructor(parser: Parser, stopToken = ')') {
    while (parser.nextToken?.type !== stopToken) {
      this.parameters.push(new Identifier(parser))

      if (parser.nextToken?.type !== stopToken) {
        parser.validate(',')
      }
    }
  }
}
