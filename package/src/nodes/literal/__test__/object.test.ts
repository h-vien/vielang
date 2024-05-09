import { parserNode } from '@parser/test'
import { ObjectLiteral } from '../object'

describe('Test for string literal', () => {
  it('should parse the string with double quote', () => {
    const result = parserNode.parse('const a = {a: 12, b: 24}', ObjectLiteral)
    console.log(JSON.stringify(result, null, 2))
  })
})
