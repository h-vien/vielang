import { Parser } from '@parser/parser'
import { VariableDeclaration } from '../declarations/variable/declaration'
import { StatementTree } from './tree'

export class BlockStatement {
  type = 'BlockStatement'
  body: any

  constructor(parser: Parser) {
    const statements: Array<any> = []

    parser.validate('{')
    statements.push(...new StatementTree(parser, ['}']).body)

    parser.validate('}')
    console.log(parser.nextToken)
    this.body = statements
  }
}
