import { parserNode } from '@parser/test'
import { ReturnStatement } from '../return'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test for return statement ', () => {
  it('Should return a new instance of StatementTree', () => {
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
})
