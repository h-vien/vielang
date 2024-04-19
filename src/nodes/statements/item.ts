import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { VariableDeclaration } from '../declarations/variable/declaration'

export class StatementItem {
  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.LET:
      case Keyword.CONST:
      case Keyword.VAR: {
        Object.assign(this, new VariableDeclaration(parser))
        break
      }
    }
  }
}
