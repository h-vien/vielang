import { Identifier } from '@parser/nodes/identifier/index'
import { Expression } from '../index'
import { Parser } from '@parser/parser'
import { Token } from '@parser/types/token'
import { Operator } from '@parser/types/operator'

export class BinaryExpressionBuilder {
  parser: Parser
  constructor(_parser: Parser) {
    this.parser = _parser
  }
  BuilderExpression(builderName: string, operatorToken: Operator) {
    let left = this[builderName]?.()

    while (this.parser.nextToken?.type === operatorToken) {
      const operator = this.parser.validate(operatorToken).value
      const right = this[builderName]()
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right
      }
    }

    return left
  }

  AdditiveExpression() {
    console.log('vao dau')
    return {
      type: 'BinaryExpression',
      operator: '+',
      left: new Identifier(this.parser),
      right: new Expression(this.parser)
    }
  }
}
