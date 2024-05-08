import { Parser } from '@parser/parser'
import { StatementItem } from './item'

export class StatementTree {
  body: Array<StatementItem>

  constructor(parser: Parser, stopTokens?: Array<string>) {
    const statements: Array<StatementItem> = []
    while (parser.tokenizer.isEOF() === false && !stopTokens?.includes(String(parser.nextToken?.type))) {
      const statement = new StatementItem(parser)
      if (statement !== undefined) {
        statements.push(statement)
      }

      // Eat the first ";" after every statement
      if (parser.nextToken?.type === ';') {
        parser.validate(';')
      }
    }

    this.body = statements
  }
}
