import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { NullLiteral } from '../null'
import { Literal } from '../index'

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
