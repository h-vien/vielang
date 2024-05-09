import { Parser } from '@parser/parser'
import { IterationStatement } from './breakable/iteration'
import { Identifier } from '../identifier'

export class LabelledStatement {
  type = 'LabelledStatement'

  label: Identifier

  body: IterationStatement

  constructor(parser: Parser, identifier: Identifier) {
    this.label = identifier

    parser.validate(':')

    this.body = new IterationStatement(parser)
  }
}
