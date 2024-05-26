import { Keyword } from '@parser/constants/keyword'
import { Identifier } from '@parser/nodes/identifier/index'
import { Literal } from '@parser/nodes/literal/index'
import { Parser } from '@parser/parser'
import { Token } from '@parser/types/token'
import { Expression } from '../index'

export class BinaryExpressionBuilder {
  parser: Parser
  identifier?: Identifier
  constructor(_parser: Parser, _identifier?: Identifier) {
    this.parser = _parser
    this.identifier = _identifier
  }
  BuilderExpression(builderName: string, operatorToken: Token['type']) {
    let left = (this as Expression)[builderName]?.()
    while (this.parser.nextToken?.type === operatorToken) {
      const operator = this.parser.validate(operatorToken).value
      const right = (this as Expression)[builderName]()
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
    const res = this.BuilderExpression('UnaryExpression', Keyword.MULTIPLICATIVE_OPERATOR)
    return res
  }
  UnaryExpression(): any {
    let operator
    switch (this.parser.nextToken?.type) {
      case Keyword.ADDITIVE_OPERATOR:
        operator = this.parser.validate(Keyword.ADDITIVE_OPERATOR).value
        break
      case '!':
        operator = this.parser.validate('!').value
        break
    }
    if (operator != null) {
      return {
        type: 'UnaryExpression',
        operator,
        argument: new Literal(this.parser)
      }
    }
    return new Expression(this.parser)
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
