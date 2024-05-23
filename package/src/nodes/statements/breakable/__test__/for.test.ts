import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { ForStatement } from '../iteration/for'

describe('For statement test', () => {
  it('Should parse for statement correctly', () => {
    const result = parserNode.parse('for(let a = 0; a < 10; a++){return 1;}', ForStatement)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'ForStatement',
      init: {
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            init: {
              type: 'NumericLiteral',
              start: 12,
              end: 13,
              value: 0,
              extra: {
                rawValue: 0,
                raw: '0'
              }
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
          start: 19,
          end: 21,
          value: 10,
          extra: {
            rawValue: 10,
            raw: '10'
          }
        }
      },
      update: {
        type: 'UpdateExpression',
        argument: {
          type: 'Identifier',
          name: 'a'
        },
        prefix: false,
        operator: '++'
      },
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ReturnStatement',
            argument: {
              type: 'NumericLiteral',
              start: 35,
              end: 36,
              value: 1,
              extra: {
                rawValue: 1,
                raw: '1'
              }
            }
          }
        ]
      }
    })
  })

  it('Should parse for statement correctly', () => {
    const result = parserNode.parse('lặp(khai báo a = 0; a < 10 - 2 * 2; a++){return 1;}', ForStatement)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'ForStatement',
      init: {
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            init: {
              type: 'NumericLiteral',
              start: 17,
              end: 18,
              value: 0,
              extra: {
                rawValue: 0,
                raw: '0'
              }
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
          type: 'BinaryExpression',
          operator: '-',
          left: {
            type: 'NumericLiteral',
            start: 24,
            end: 26,
            value: 10,
            extra: {
              rawValue: 10,
              raw: '10'
            }
          },
          right: {
            type: 'BinaryExpression',
            operator: '*',
            left: {
              type: 'NumericLiteral',
              start: 29,
              end: 30,
              value: 2,
              extra: {
                rawValue: 2,
                raw: '2'
              }
            },
            right: {
              type: 'NumericLiteral',
              start: 33,
              end: 34,
              value: 2,
              extra: {
                rawValue: 2,
                raw: '2'
              }
            }
          }
        }
      },
      update: {
        type: 'UpdateExpression',
        argument: {
          type: 'Identifier',
          name: 'a'
        },
        prefix: false,
        operator: '++'
      },
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ReturnStatement',
            argument: {
              type: 'NumericLiteral',
              start: 48,
              end: 49,
              value: 1,
              extra: {
                rawValue: 1,
                raw: '1'
              }
            }
          }
        ]
      }
    })
  })
})
