import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { Expression } from '../index'
import { BinaryExpression } from '../binary/index'

describe('expression-binary.test', () => {
  it('should parse the syntax normally', () => {
    const res = parserNode.parse('a = 1 + 2 ', Expression)
    expect(toPlainObject(res)).toEqual({
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
          end: 5,
          value: 1,
          extra: {
            rawValue: 1,
            raw: '1'
          }
        },
        right: {
          type: 'NumericLiteral',
          start: 8,
          end: 9,
          value: 2,
          extra: {
            rawValue: 2,
            raw: '2'
          }
        }
      }
    })
  })
  it('should parse the syntax normally', () => {
    const res = parserNode.parse('a - 1 * 2 ', BinaryExpression)
    expect(toPlainObject(res)).toEqual({
      type: 'BinaryExpression',
      left: {
        type: 'Identifier',
        name: 'a'
      },
      operator: '-',
      right: {
        type: 'BinaryExpression',
        operator: '*',
        left: {
          type: 'NumericLiteral',
          start: 4,
          end: 5,
          value: 1,
          extra: {
            rawValue: 1,
            raw: '1'
          }
        },
        right: {
          type: 'NumericLiteral',
          start: 8,
          end: 9,
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
