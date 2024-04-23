import toPlainObject from '@parser/utils/toPlainObject'
import { VieLangMPP } from '../vielangMPP'

describe('Run Test', () => {
  it('should generate the code', () => {
    const vielang = new VieLangMPP()

    const { target } = vielang.compile(`
      hằng số tên = "Viên Huỳnh";khai báo địa chỉ = 'Đà Nẵng';
      khai báo tuổi = 22;
      return tuổi;
      hàm a (){
        khai báo b = 1
      }
      `)

    expect(toPlainObject(target)).toBe(
      'const t_234n = "Viên Huỳnh";\nlet _273_7883a_ch_7881 = "Đà Nẵng";\nlet tu_7893i = 22;\nreturn tu_7893i;\nfunction a() {\n  let b = 1;\n}'
    )
  })
})
