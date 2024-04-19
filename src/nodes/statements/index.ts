import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { BlockStatement } from './block'

export class Statement {
  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case '{': {
        Object.assign(this, new BlockStatement(parser))
        break
      }
    }
  }
}
