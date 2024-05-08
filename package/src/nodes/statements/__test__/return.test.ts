import { parserNode } from '@parser/test'
import { ReturnStatement } from '../return'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test for return statement ', () => {
  it('Should parse syntax correctly', () => {
    const result = parserNode.parse('return 1;', ReturnStatement)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'ReturnStatement',
      argument: {
        type: 'NumericLiteral',
        value: 1,
        extra: {
          rawValue: 1,
          raw: '1'
        },
        start: 7,
        end: 8
      }
    })
  })
  it('Should parse vietnamese syntax correctly', () => {
    const result = parserNode.parse('trả về 1;', ReturnStatement)
    console.log(JSON.stringify(result, null, 2))
  })
})
