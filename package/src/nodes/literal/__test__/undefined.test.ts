import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { UndefinedLiteral } from '../undefined'
import { Literal } from '../index'

describe('Test for undefined literal', () => {
  it('should parse the vietnamse undefined', () => {
    const result = parserNode.parse('không xác định', Literal)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'UndefinedLiteral',
      start: 0,
      end: 14
    } as UndefinedLiteral)
  })
})
