import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Token } from '@parser/types/token'
import { UnaryExpression } from '../unary'
import { Literal } from '@parser/nodes/literal/index'
import { Expression } from '../index'
import { Identifier } from '@parser/nodes/identifier/index'

export class BinaryExpressionBuilder {
  parser: Parser
  identifier?: Identifier
  constructor(_parser: Parser, _identifier?: Identifier) {
    this.parser = _parser
    this.identifier = _identifier
  }
  BuilderExpression(builderName: string, operatorToken: Token['type']) {
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
    const res = this.BuilderExpression('MultiplicativeExpression', Keyword.ADDITIVE_OPERATOR)
    return res
  }
  MultiplicativeExpression() {
    const res = this.BuilderExpression('PrimaryExpression', Keyword.MULTIPLICATIVE_OPERATOR)
    return res
  }
  RelationalExpression() {
    const res = this.BuilderExpression('AdditiveExpression', Keyword.RELATIONAL_OPERATOR)
    return res
  }
  PrimaryExpression() {
    switch (this.parser.nextToken?.type) {
      case '(':
        return this.ParenthesizedExpression()
      case Keyword.IDENTIFIER:
        return new Identifier(this.parser)
      default:
        return new Literal(this.parser)
    }
  }

  ParenthesizedExpression() {
    this.parser.validate('(')
    const expression = new Expression(this.parser)
    this.parser.validate(')')
    return expression
  }
}
