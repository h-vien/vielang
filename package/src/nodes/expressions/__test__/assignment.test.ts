import { parserNode } from '@parser/test'
import { AssignmentExpression } from '../assignment'
import toPlainObject from '@parser/utils/toPlainObject'

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
        type: 'NumericLiteral',
        value: 12,
        extra: {
          rawValue: 12,
          raw: '12'
        },
        start: 4,
        end: 6
      }
    })
  })
  it('Should parse the syntax with a complex expression', () => {
    const result = parserNode.parse('a = 12 + 2;', AssignmentExpression)
    console.log(JSON.stringify(result, null, 2))
    expect(toPlainObject(result)).toStrictEqual({
      type: 'AssignmentExpression',
      left: {
        type: 'Identifier',
        name: 'a'
      },
      operator: '=',
      right: {
        type: 'NumericLiteral',
        value: 12,
        extra: {
          rawValue: 12,
          raw: '12'
        },
        start: 4,
        end: 6
      }
    })
  })
})
