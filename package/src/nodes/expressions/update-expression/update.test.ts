import { parserNode } from '@parser/test'
import { Expression } from '../index'
import { SuffixUpdateExpression } from './suffix-update'
import toPlainObject from '@parser/utils/toPlainObject'

describe('expression-update.test', () => {
  it('should parse the suffix update syntax normally', () => {
    const res = parserNode.parse('a++', Expression)
    expect(toPlainObject(res)).toStrictEqual({
      type: 'UpdateExpression',
      argument: {
        type: 'Identifier',
        name: 'a'
      },
      prefix: false,
      operator: '++'
    })
  })
  //   it('should parse the prefix update syntax normally', () => {
  //     //TODO: Handle this parser failed
  //     const res = parserNode.parse('--a', Expression)
  //   })
  it('should parse the prefix update syntax normally', () => {
    const res = parserNode.parse('++a', Expression)
    expect(toPlainObject(res)).toStrictEqual({
      type: 'UpdateExpression',
      argument: {
        type: 'Identifier',
        name: 'a'
      },
      prefix: true,
      operator: '++'
    })
  })
})
