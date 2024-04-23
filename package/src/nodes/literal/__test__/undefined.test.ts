import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { Literal } from '..'
import { UndefinedLiteral } from '../undefined'

describe('Test for undefined literal', () => {
  it('should parse the undefined', () => {
    const result = parserNode.parse(`undefined`, Literal)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'UndefinedLiteral',
      start: 0,
      end: 9
    } as UndefinedLiteral)
  })
  it('should parse the vietnamse undefined', () => {
    const result = parserNode.parse('không xác định', Literal)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'UndefinedLiteral',
      start: 0,
      end: 14
    } as UndefinedLiteral)
  })
})
