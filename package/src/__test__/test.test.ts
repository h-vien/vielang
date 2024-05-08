import { Program } from '@parser/program'
import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test every thing', () => {
  it('Should parse correctly', () => {
    const code = `for(let a = 0; a < 10; a = a + 1){return 1;}`
    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
