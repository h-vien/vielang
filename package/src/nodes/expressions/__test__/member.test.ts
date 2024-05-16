import { parserNode } from '@parser/test'
import { Expression } from '../index'

describe('expression-member.test', () => {
  it('should parse the syntax normally', () => {
    const result = parserNode.parse(
      `
        [1,2,4,5].length
    `,
      Expression
    )
  })
})
