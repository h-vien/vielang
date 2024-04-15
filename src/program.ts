import { Parser } from '@parser/parser'

export class Program {
  type = 'Program'

  constructor(parser: Parser) {
    console.log('Program', parser)
  }
}
