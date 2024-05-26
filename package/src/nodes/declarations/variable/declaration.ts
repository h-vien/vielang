import { Parser } from '@parser/parser'
import { VariableDeclarator } from './declarator'
import { Keyword } from '@parser/constants/keyword'

export class VariableDeclaration {
  type = 'VariableDeclaration'

  declarations: Array<VariableDeclarator>

  kind: 'let' | 'const'

  constructor(parser: Parser) {
    let kind: 'let' | 'const' = 'let'
    let isConstant = false

    switch (parser.nextToken?.type) {
      case Keyword.LET: {
        parser.validate(Keyword.LET)
        kind = 'let'

        break
      }
      case Keyword.CONST: {
        parser.validate(Keyword.CONST)
        kind = 'const'
        isConstant = true

        break
      }

      default: {
        throw new SyntaxError(`Unexpected token: "${parser.nextToken?.value}", expected a variable declarator!`)
      }
    }

    const declarations: Array<VariableDeclarator> = []

    do {
      declarations.push(new VariableDeclarator(parser, isConstant))
    } while (String(parser.nextToken?.type) === ',' && parser.validate(','))

    this.declarations = declarations
    this.kind = kind
  }
}
