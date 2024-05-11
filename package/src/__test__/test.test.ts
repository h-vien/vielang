import { Program } from '@parser/program'
import { parserNode } from '@parser/test'

describe('Test every thing', () => {
  it('Should parse correctly', () => {
    const code = `
    khi mà( a > 3 -1){
        in ra(a)
        a ++
    }

    `

    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
