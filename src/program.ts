import { Parser } from '@parser/parser'
import { VariableDeclaration } from './nodes/declarations/variable/declaration'

export class Program {
  type = 'Program'
  body: any
  constructor(parser: Parser) {
    this.body = new VariableDeclaration(parser)
  }
}
