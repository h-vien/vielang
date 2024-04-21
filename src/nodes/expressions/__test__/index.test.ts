import { parserNode } from '@parser/test'
import { Expression } from '..'
import toPlainObject from '@parser/utils/toPlainObject'
import { BinaryExpression } from '../binary'

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
})
