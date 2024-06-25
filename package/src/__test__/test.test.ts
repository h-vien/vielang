import { transpiler } from '@parser'
import { BinaryExpression } from '@parser/nodes/expressions/binary/index'
import { Expression } from '@parser/nodes/expressions/index'
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

    const switch_case = `
    khai báo tuổi tác = 12
    duyệt(tuổi tác){
        trường hợp 20: 
            in ra("bạn 20 tuổi")
        trường hợp 12: 
            in ra("bạn 12 tuổi")
        mặc định: 
            in ra("mặc định ở ")
    }`

    const for_statement = `lặp(khai báo i = 0 ;i < 5 ; i++){
      in ra(i)
  }`
    const while_statement = `khai báo a = 0;
  khi mà (a < 4){
    in ra (a)
    a++
  }`

    const test = `khai báo and, or, xor , left shift, right shift 

    and = 5 & 1 
    or = 5 | 1 
    xor = 5 ^ 1 
    left shift = 5 >> 1 
    right shift = 5 << 1 
    
    in ra(and)
    in ra(', ')
    in ra(or)
    in ra(', ')
    in ra(xor)
    in ra(', ')
    in ra(left shift)
    in ra(', ')
    in ra(right shift)
    in ra(', ')
    
    `

    const res = parserNode.parse(test, Program)
    console.log(JSON.stringify(res, null, 2), 'this log')
    // const result = parserNode.parse(test, Program)
    // console.log(result)
    // const _test = transpiler.compile(test)
    // console.log(_test)
  })
})
