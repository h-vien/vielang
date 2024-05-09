import { Program } from '@parser/program'
import { parserNode } from '@parser/test'

describe('Test every thing', () => {
  it('Should parse correctly', () => {
    // const code = `
    // hàm primeCheck(số)
    // {
    //     nếu (số < 2)
    //         trả về sai;
    //     lặp (khai báo i = 2; i < số; ++i){
    //         khai báo test = số % i
    //         nếu ( test == 0){
    //             trả về sai
    //         }
    //         trả về đúng;
    //     }

    // }

    // `

    const code = `
      khai báo obj = {
        a: 1,
        b: 2
      }
    `
    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
