import { parserNode } from '@parser/test'
import { IfStatement } from '../if'
import toPlainObject from '@parser/utils/toPlainObject'
import { transpiler } from '@parser'

describe('Test for if statement ', () => {
  it('Should parse syntax correctly', () => {
    const result = parserNode.parse('nếu(điều kiện a){return 1;}', IfStatement)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'IfStatement',
      test: {
        type: 'Identifier',
        name: '_273i_7873u_ki_7879n_a'
      },
      consequent: {
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
              start: 24,
              end: 25
            }
          }
        ]
      }
    })
  })
  it('Should parse if else syntax correctly', () => {
    const result = parserNode.parse('nếu(a == 2){return 1;} ngược lại {return 2;}', IfStatement)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'IfStatement',
      test: {
        type: 'BinaryExpression',
        left: {
          type: 'Identifier',
          name: 'a'
        },
        operator: '==',
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
      },
      consequent: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ReturnStatement',
            argument: {
              type: 'NumericLiteral',
              start: 19,
              end: 20,
              value: 1,
              extra: {
                rawValue: 1,
                raw: '1'
              }
            }
          }
        ]
      },
      alternate: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ReturnStatement',
            argument: {
              type: 'NumericLiteral',
              start: 41,
              end: 42,
              value: 2,
              extra: {
                rawValue: 2,
                raw: '2'
              }
            }
          }
        ]
      }
    })
  })
})
