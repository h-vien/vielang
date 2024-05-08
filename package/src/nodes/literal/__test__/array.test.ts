import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { ArrayLiteral } from '../array'

describe('Test for array literal', () => {
  it('should parse the vietnamse null', () => {
    const result = parserNode.parse('[2,4,"4"]', ArrayLiteral)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'ArrayLiteral',
      elements: [
        {
          type: 'NumericLiteral',
          value: 2,
          extra: {
            rawValue: 2,
            raw: '2'
          },
          start: 1,
          end: 2
        },
        {
          type: 'NumericLiteral',
          value: 4,
          extra: {
            rawValue: 4,
            raw: '4'
          },
          start: 3,
          end: 4
        },
        {
          type: 'StringLiteral',
          value: '4',
          extra: {
            rawValue: '4',
            raw: '"4"'
          },
          start: 5,
          end: 8
        }
      ]
    })
  })
})
