import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { AssignmentExpression } from '../assignment'

describe('expression-assignment.test', () => {
  it('should parse the syntax normally', () => {
    const result = parserNode.parse('a = 12;', AssignmentExpression)
    expect(toPlainObject(result)).toEqual({
      type: 'AssignmentExpression',
      left: {
        type: 'Identifier',
        name: 'a'
      },
      operator: '=',
      right: {
        type: 'NumericLiteral',
        start: 4,
        end: 6,
        value: 12,
        extra: {
          rawValue: 12,
          raw: '12'
        }
      }
    })
  })
  it('Should parse the syntax with a complex expression', () => {
    const result = parserNode.parse('a = 12 + 2;', AssignmentExpression)
    expect(toPlainObject(result)).toEqual({
      type: 'AssignmentExpression',
      left: {
        type: 'Identifier',
        name: 'a'
      },
      operator: '=',
      right: {
        type: 'BinaryExpression',
        operator: '+',
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
