import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { BinaryExpression } from '../binary'
import { Expression } from '../index'

describe('expression-binary.test', () => {
  it('should parse the syntax normally', () => {
    const result = parserNode.parse('xin chào === hello', Expression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'BinaryExpression',
      operator: '===',
      left: {
        type: 'Identifier',
        name: 'xin_ch_224o'
      },
      right: {
        type: 'Identifier',
        name: 'hello'
      }
    } as BinaryExpression)
  })
  it('should parse the syntax normally', () => {
    const res = parserNode.parse('a % i === 0', Expression)
    console.log(JSON.stringify(res, null, 2))
  })
})
