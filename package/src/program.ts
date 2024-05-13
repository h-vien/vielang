import { Parser } from '@parser/parser'
import { StatementTree } from './nodes/statements/tree'
import { Statement } from './nodes/statements/index'

export class Program {
  type = 'Program'
  body: Array<Statement>
  constructor(parser: Parser) {
    this.body = new StatementTree(parser).body
  }
}
