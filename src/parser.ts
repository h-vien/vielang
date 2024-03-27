class Parser {
  _syntax: string

  constructor() {
    this._syntax = ''
  }
  parse(syntax: string) {
    this._syntax = syntax
    return this.Program()
    //
  }

  Program() {
   return this.NumericLiteral()
  }

  NumericLiteral() {
    return {
      type: 'NumericLiteral',
      value: Number(this._syntax),
      start: 0,
      end: 0
    }
  }
}

export default Parser
