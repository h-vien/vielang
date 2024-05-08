import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { IterationStatement } from './iteration'
import { SwitchStatement } from './switch'

export class BreakableStatement {
  [key: string]: any

  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.DO:
      case Keyword.WHILE:
      case Keyword.FOR: {
        Object.assign(this, new IterationStatement(parser))
        break
      }

      case Keyword.SWITCH: {
        Object.assign(this, new SwitchStatement(parser))
        break
      }
    }
  }
}
