import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { Literal } from '..'
import { StringLiteral } from '../string'

describe('Test for null literal', () => {
  it('should parse the null', () => {
    const result = parserNode.parse(`null`, Literal)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'NullLiteral',
      start: 0,
      end: 4
    } as StringLiteral)
  })
  it('should parse the vietnamse null', () => {
    const result = parserNode.parse('vô giá trị', Literal)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'NullLiteral',
      start: 0,
      end: 12
    } as StringLiteral)
  })
})
