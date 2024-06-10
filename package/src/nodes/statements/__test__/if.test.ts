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
    const result = transpiler.compile('nếu(a == 2){return 1;} ngược lại {return 2;}')
    console.log(JSON.stringify(result, null, 2))
  })
})
