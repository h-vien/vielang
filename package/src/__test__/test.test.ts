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

    const switch_case = `khai báo tuổi tác = 12

    duyệt(tuổi tác){
        trường hợp 20: 
            in ra("bạn 20 tuổi")
        trường hợp 12: 
            in ra("bạn 12 tuổi")
        mặc định: 
            in ra("mặc định ở ")
    } `

    const for_statement = `lặp(khai báo i = 0 ;i < 5 ; i++){
      in ra(i)
  }`

    const while_statement = `khai báo a = 0;
  khi mà (a < 4){
      in ra (a)
      a++
  }`
    const test = `khai báo a = -12 `
    const result = parserNode.parse(test, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
