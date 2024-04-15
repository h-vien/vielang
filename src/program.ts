import { Parser } from '@parser/parser'
import { VariableDeclaration } from './declarations/variable/declaration'

export class Program {
  type = 'Program'
  body: any
  constructor(parser: Parser) {
    this.body = new VariableDeclaration(parser)
    console.log('Program', parser)
  }
}
