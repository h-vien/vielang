import { Parser } from '@parser/parser'
import { Statement } from './nodes/statements'
import { StatementTree } from './nodes/statements/tree'

export class Program {
  type = 'Program'
  body: Array<Statement>
  constructor(parser: Parser) {
    this.body = new StatementTree(parser).body
  }
}
