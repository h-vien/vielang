import { Program } from '@parser/program'
import { parserNode } from '@parser/test'

describe('Test every thing', () => {
  it('Should parse correctly', () => {
    const code = `
    hàm kiểm tra (số)
    {
      trả về sai

    }

    `

    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
