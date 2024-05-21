import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { AssignmentExpression } from '../assignment'

describe('expression-assignment.test', () => {
  it('should parse the syntax normally', () => {
    const result = parserNode.parse('a = 12;', AssignmentExpression)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'AssignmentExpression',
      left: {
        type: 'Identifier',
        name: 'a'
      },
      operator: '=',
      right: {
        type: 'BinaryExpression',
        left: {
          type: 'NumericLiteral',
          start: 4,
          end: 6,
          value: 12,
          extra: {
            rawValue: 12,
            raw: '12'
          }
        },
        right: {}
      }
    })
  })
  it('Should parse the syntax with a complex expression', () => {
    const result = parserNode.parse('a = 12 + 2;', AssignmentExpression)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'AssignmentExpression',
      left: {
        type: 'Identifier',
        name: 'a'
      },
      operator: '=',
      right: {
        type: 'BinaryExpression',
        left: {
          type: 'NumericLiteral',
          start: 4,
          end: 6,
          value: 12,
          extra: {
            rawValue: 12,
            raw: '12'
          }
        },
        operator: '+',
        right: {
          type: 'NumericLiteral',
          start: 9,
          end: 10,
          value: 2,
          extra: {
            rawValue: 2,
            raw: '2'
          }
        }
      }
    })
  })
})
