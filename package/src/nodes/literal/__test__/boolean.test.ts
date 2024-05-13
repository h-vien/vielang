import toPlainObject from '@parser/utils/toPlainObject'
import { BooleanLiteral } from '../boolean'
import { parserNode } from '@parser/test'
import { Literal } from '../index'

describe('Test for boolean literal', () => {
  it('should parse the syntax normally', () => {
    const result = parserNode.parse('sai', Literal)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'BooleanLiteral',
      value: false,
      start: 0,
      end: 3
    } as BooleanLiteral)
  })

  it('should parse the syntax normally', () => {
    const result = parserNode.parse(`đúng`, Literal)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'BooleanLiteral',
      value: true,
      start: 0,
      end: 4
    } as BooleanLiteral)
  })
})
