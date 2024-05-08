import { Program } from '@parser/program'
import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test every thing', () => {
  it('Should parse correctly', () => {
    const code = `in ra(12)`
    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
