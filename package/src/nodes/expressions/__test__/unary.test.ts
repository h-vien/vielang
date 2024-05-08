import { parserNode } from '@parser/test'
import { UnaryExpression } from '../unary'
import toPlainObject from '@parser/utils/toPlainObject'

describe('expression-unary.test', () => {
  it('should parse the syntax normally', () => {
    const result = parserNode.parse('+"12"', UnaryExpression)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'UnaryExpression',
      operator: '+',
      prefix: true,
      argument: {
        type: 'StringLiteral',
        value: '12',
        extra: {
          rawValue: '12',
          raw: '"12"'
        },
        start: 1,
        end: 5
      }
    })
  })
})
