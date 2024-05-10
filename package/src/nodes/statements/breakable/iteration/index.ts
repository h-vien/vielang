import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { ForStatement } from './for'
import { WhileStatement } from './while'

export class IterationStatement {
  [key: string]: any

  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.FOR: {
        Object.assign(this, new ForStatement(parser))
        break
      }
      case Keyword.WHILE: {
        Object.assign(this, new WhileStatement(parser))
        break
      }
    }
  }
}
