import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { Literal } from '..'
import { NullLiteral } from '../null'

describe('Test for null literal', () => {
  it('should parse the vietnamse null', () => {
    const result = parserNode.parse('vô giá trị', Literal)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'NullLiteral',
      start: 0,
      end: 10
    } as NullLiteral)
  })
})
