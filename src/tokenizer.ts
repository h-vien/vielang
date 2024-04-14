import { Parser } from './parser'

export class Tokenizer {
  private parser: Parser
  private cursor: number

  constructor(parser: Parser) {
    console.log(parser, 'parser')
    this.parser = parser
    this.cursor = 0
  }

  isEOF() {
    return this.cursor === this.parser._syntax.length
  }
  hasMoreTokens() {
    console.log(this.cursor, this.parser._syntax.length, 'this.cursor < this.parser._syntax.length')
    return this.cursor < this.parser._syntax.length
  }
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null
    }
    const string = this.parser._syntax.slice(this.cursor)
    console.log(string, 'log day ne string')
    if (!Number.isNaN(Number(string[0]))) {
      let number = ''
      while (!Number.isNaN(Number(string[this.cursor]))) {
        number += string[this.cursor++]
      }
      return {
        type: 'NUMBER',
        value: Number(number)
      }
    }

    if (string[0] === '"') {
      let string = ''
      while (string[this.cursor] !== '"' && this.isEOF()) {
        string += string[this.cursor++]
      }
      this.cursor++
      return {
        type: 'STRING',
        value: string
      }
    }
    return null
  }
}
