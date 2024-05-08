import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { ForStatement } from './for'

export class IterationStatement {
  [key: string]: any

  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.FOR: {
        Object.assign(this, new ForStatement(parser))
        break
      }
    }
  }
}
