import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { StringLiteral } from '../string'
import { Literal } from '../index'

describe('Test for string literal', () => {
  it('should parse the string with double quote', () => {
    const result = parserNode.parse(`"Chào thế giới!"`, Literal)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'StringLiteral',
      value: 'Chào thế giới!',
      extra: {
        rawValue: 'Chào thế giới!',
        raw: '"Chào thế giới!"'
      },
      start: 0,
      end: 16
    } as StringLiteral)
  })

  it('should parse the string with single quote', () => {
    const result = parserNode.parse(`'Chào thế giới!'`, Literal)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'StringLiteral',
      value: 'Chào thế giới!',
      extra: {
        rawValue: 'Chào thế giới!',
        raw: '"Chào thế giới!"'
      },
      start: 0,
      end: 16
    } as StringLiteral)
  })

  it('should parse the string with template literals', () => {
    const result = parserNode.parse('`Chào thế giới!`', Literal)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'StringLiteral',
      value: 'Chào thế giới!',
      extra: {
        rawValue: 'Chào thế giới!',
        raw: '"Chào thế giới!"'
      },
      start: 0,
      end: 16
    } as StringLiteral)
  })

  it('should parse the syntax normally', () => {
    const result = parserNode.parse(`'1'`, Literal)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'StringLiteral',
      value: '1',
      extra: {
        rawValue: '1',
        raw: '"1"'
      },
      start: 0,
      end: 3
    } as StringLiteral)
  })
})
