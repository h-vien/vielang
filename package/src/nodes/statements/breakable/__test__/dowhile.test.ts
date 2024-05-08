import { parserNode } from '@parser/test'
import { DoWhileStatement } from '../iteration/dowhile'
import toPlainObject from '@parser/utils/toPlainObject'

describe('For statement test', () => {
  it('Should parse for statement correctly', () => {
    const result = parserNode.parse(
      `thực hiện{
        in ra("Xin chào");
    } khi mà(a > 4)`,
      DoWhileStatement
    )

    expect(toPlainObject(result)).toStrictEqual({
      type: 'DoWhileStatement',
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
                  start: 31,
                  end: 41
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
          start: 61,
          end: 62
        }
      }
    })
  })
})
