import { parserNode } from '@parser/test'
import { ObjectLiteral } from '../object'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test for string literal', () => {
  it('should parse the string with double quote', () => {
    const result = parserNode.parse(
      `
        {
            a: 1,
            b: 2
        }
        `,
      ObjectLiteral
    )
    expect(toPlainObject(result)).toStrictEqual({
      type: 'ObjectLiteral',
      properties: [
        {
          type: 'ObjectProperty',
          method: false,
          computed: false,
          key: {
            type: 'Identifier',
            name: 'a'
          },
          value: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1'
            },
            start: 26,
            end: 27
          }
        },
        {
          type: 'ObjectProperty',
          method: false,
          computed: false,
          key: {
            type: 'Identifier',
            name: 'b'
          },
          value: {
            type: 'NumericLiteral',
            value: 2,
            extra: {
              rawValue: 2,
              raw: '2'
            },
            start: 44,
            end: 45
          }
        }
      ]
    })
  })
})
