import { parserNode } from '@parser/test'
import { WhileStatement } from '../iteration/while'
import toPlainObject from '@parser/utils/toPlainObject'

describe('While statement test', () => {
  it('Should parse while statement correctly', () => {
    const result = parserNode.parse(
      `khi mà(a > 4){
        in ra("Xin chào");
    } `,
      WhileStatement
    )

    expect(toPlainObject(result)).toStrictEqual({
      type: 'WhileStatement',
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'console'
                },
                property: {
                  type: 'Identifier',
                  name: 'log'
                },
                computed: false,
                optional: false
              },
              arguments: [
                {
                  type: 'StringLiteral',
                  value: 'Xin chào',
                  extra: {
                    rawValue: 'Xin chào',
                    raw: '"Xin chào"'
                  },
                  start: 35,
                  end: 45
                }
              ],
              optional: false
            }
          }
        ]
      },
      test: {
        type: 'BinaryExpression',
        left: {
          type: 'Identifier',
          name: 'a'
        },
        operator: '>',
        right: {
          type: 'NumericLiteral',
          value: 4,
          extra: {
            rawValue: 4,
            raw: '4'
          },
          start: 11,
          end: 12
        }
      }
    })
  })
  it('Should parse complex condition correctly', () => {
    const code = `
        khi mà( a > 3 -1){
            in ra(a)
            a ++
        }
    `
    const result = parserNode.parse(code, WhileStatement)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'WhileStatement',
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'console'
                },
                property: {
                  type: 'Identifier',
                  name: 'log'
                },
                computed: false,
                optional: false
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              optional: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              operator: '++',
              argument: {
                type: 'Identifier',
                name: 'a'
              },
              prefix: false
            }
          }
        ]
      },
      test: {
        type: 'BinaryExpression',
        left: {
          type: 'Identifier',
          name: 'a'
        },
        operator: '>',
        right: {
          type: 'BinaryExpression',
          left: {
            type: 'NumericLiteral',
            value: 3,
            extra: {
              rawValue: 3,
              raw: '3'
            },
            start: 21,
            end: 22
          },
          operator: '-',
          right: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1'
            },
            start: 24,
            end: 25
          }
        }
      }
    })
  })
})
