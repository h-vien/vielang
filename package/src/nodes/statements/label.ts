import { Parser } from '@parser/parser'
import { Identifier } from '../identifier/index'
import { IterationStatement } from './breakable/iteration/index'

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
