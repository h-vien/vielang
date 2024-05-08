import { IfStatement } from '@parser/nodes/if'
import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test for if statement ', () => {
  it('Should parse syntax correctly', () => {
    const result = parserNode.parse('nếu(điều kiện a){return 1;}', IfStatement)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'IfStatement',
      condition: {
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
})
