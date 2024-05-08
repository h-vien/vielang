import { parserNode } from '@parser/test'
import { ForStatement } from '../for'
import toPlainObject from '@parser/utils/toPlainObject'

describe('For statement test', () => {
  it('Should parse for statement correctly', () => {
    const result = parserNode.parse('for(let a = 0; a < 10; a = a + 1){return 1;}', ForStatement)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ForStatement',
      init: {
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            init: {
              type: 'NumericLiteral',
              value: 0,
              extra: {
                rawValue: 0,
                raw: '0'
              },
              start: 12,
              end: 13
            },
            id: {
              type: 'Identifier',
              name: 'a'
            }
          }
        ],
        kind: 'let'
      },
      test: {
        type: 'BinaryExpression',
        left: {
          type: 'Identifier',
          name: 'a'
        },
        operator: '<',
        right: {
          type: 'NumericLiteral',
          value: 10,
          extra: {
            rawValue: 10,
            raw: '10'
          },
          start: 19,
          end: 21
        }
      },
      update: {
        type: 'AssignmentExpression',
        left: {
          type: 'Identifier',
          name: 'a'
        },
        operator: '=',
        right: {
          type: 'BinaryExpression',
          left: {
            type: 'Identifier',
            name: 'a'
          },
          operator: '+',
          right: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1'
            },
            start: 31,
            end: 32
          }
        }
      },
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ReturnStatement',
            argument: {
              type: 'NumericLiteral',
              value: 1,
              extra: {
                rawValue: 1,
                raw: '1'
              },
              start: 41,
              end: 42
            }
          }
        ]
      }
    })
  })
})
