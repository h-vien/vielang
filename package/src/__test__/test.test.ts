import { Program } from '@parser/program'
import { parserNode } from '@parser/test'

describe('Test every thing', () => {
  it('Should parse correctly', () => {
    const code = `
     khai báo a =  [1,2,4,5]
    `
    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
