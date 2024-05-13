import { Parser } from '@parser/parser'
import { Identifier } from '../identifier/index'
import { Expression } from './index'

export class CallExpression {
  type = 'CallExpression'

  callee: Identifier | Expression

  arguments: Array<Identifier | Expression> = []

  optional = false

  constructor(parser: Parser, identifier: Identifier | Expression) {
    this.callee = identifier

    parser.validate('(')

    while (parser.nextToken?.type !== ')') {
      if (this.arguments.length > 0) {
        parser.validate(',')
      }

      this.arguments.push(new Expression(parser))
    }

    parser.validate(')')
  }
}
