import { Expression } from '@parser/nodes/expressions'
import { Statement } from '..'
import { Parser } from '@parser/parser'
import { Keyword } from '@parser/constants/keyword'
import { StatementTree } from '../tree'

export class SwitchStatement {
  type = 'SwitchStatement'

  discriminant: Expression

  cases: Array<{
    type: 'SwitchCase'
    test: Expression | null
    consequent: Array<Statement>
  }> = []

  // TODO: handle break statement
  constructor(parser: Parser) {
    parser.validate(Keyword.SWITCH)
    parser.validate('(')

    this.discriminant = new Expression(parser)

    parser.validate(')')
    parser.validate('{')

    while (![Keyword.DEFAULT, '}'].includes(parser.nextToken?.type as string)) {
      let hasConsequent = false

      parser.validate(Keyword.CASE)

      const test = new Expression(parser)

      parser.validate(':')

      while (![Keyword.CASE, Keyword.DEFAULT, '}'].includes(parser.nextToken?.type as string)) {
        this.cases.push({
          type: 'SwitchCase',
          test,
          consequent: new StatementTree(parser, [Keyword.CASE, Keyword.DEFAULT, '}']).body
        })
        hasConsequent = true
      }

      if (!hasConsequent) {
        this.cases.push({
          type: 'SwitchCase',
          test,
          consequent: []
        })
      }
    }

    if (parser.nextToken?.type === Keyword.DEFAULT) {
      parser.validate(Keyword.DEFAULT)
      parser.validate(':')
      this.cases.push({
        type: 'SwitchCase',
        test: null,
        consequent: new StatementTree(parser).body
      })
    }

    parser.validate('}')
  }
}
