import { Program } from '@parser/program'
import { parserNode } from '@parser/test'

describe('Test every thing', () => {
  it('Should parse correctly', () => {
    const code = `
    hàm tính giai thừa (n) {
      khai báo fact = 1;
      lặp(khai báo i =1 ; i <= n; i++){
          khai báo tạm = fact * i;
          fact = tạm 
      }
  
      trả về fact 
  }
  
  in ra (tính giai thừa(4)) // 4 * 3 * 2
    `

    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
