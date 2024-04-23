import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { VariableDeclaration } from './variable/declaration'
import { FunctionDeclaration } from './function'

export class Declaration {
  [key: string]: any

  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.VAR:
      case Keyword.LET:
      case Keyword.CONST: {
        Object.assign(this, new VariableDeclaration(parser))
        break
      }
      case Keyword.ASYNC:
      case Keyword.FUNCTION: {
        Object.assign(this, new FunctionDeclaration(parser))
        break
      }
    }
  }
}
