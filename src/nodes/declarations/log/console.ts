import { Keyword } from '@parser/constants/keyword'
import { Expression } from '@parser/nodes/expressions'
import { Identifier } from '@parser/nodes/identifier'
import { Parser } from '@parser/parser'

export class ConsoleLogExpression {
  type = 'ConsoleLogExpression'

  body: Array<Identifier | Expression> = []

  optional = false

  constructor(parser: Parser) {
    parser.validate(Keyword.LOG)

    parser.validate('(')
    while (parser.nextToken?.type !== ')') {
      if (this.body.length > 0) {
        parser.validate(',')
      }

      this.body.push(new Expression(parser))
    }

    parser.validate(')')
  }
}
