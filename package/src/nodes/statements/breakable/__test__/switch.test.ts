import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { ForStatement } from '../iteration/for'
import { SwitchStatement } from '../switch'

describe('For statement test', () => {
  it('Should parse for statement correctly', () => {
    const result = parserNode.parse(
      `
              duyệt (tuổi tác) {
                  trường hợp 'TEST':
                      khai báo xyz = 1;
                  trường hợp 18:
                  trường hợp 60:
              }
          `,
      SwitchStatement
    )
    expect(toPlainObject(result)).toStrictEqual({
      type: 'SwitchStatement',
      discriminant: {
        type: 'Identifier',
        name: 'tu_7893i_t_225c'
      },
      cases: [
        {
          type: 'SwitchCase',
          test: {
            type: 'StringLiteral',
            value: 'TEST',
            extra: {
              rawValue: 'TEST',
              raw: '"TEST"'
            },
            start: 63,
            end: 69
          },
          consequent: [
            {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'NumericLiteral',
                    value: 1,
                    extra: {
                      rawValue: 1,
                      raw: '1'
                    },
                    start: 108,
                    end: 109
                  },
                  id: {
                    type: 'Identifier',
                    name: 'xyz'
                  }
                }
              ],
              kind: 'let'
            }
          ]
        },
        {
          type: 'SwitchCase',
          test: {
            type: 'NumericLiteral',
            value: 18,
            extra: {
              rawValue: 18,
              raw: '18'
            },
            start: 140,
            end: 142
          },
          consequent: []
        },
        {
          type: 'SwitchCase',
          test: {
            type: 'NumericLiteral',
            value: 60,
            extra: {
              rawValue: 60,
              raw: '60'
            },
            start: 173,
            end: 175
          },
          consequent: []
        }
      ]
    })
  })
})
