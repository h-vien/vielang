import { Program } from '@parser/program'
import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test every thing', () => {
  it('Should parse correctly', () => {
    const code = `
    khai báo tuổi tác = 12;
    duyệt (tuổi tác) {
      trường hợp 12:
          khai báo xyz = 1;
          phá vòng lặp;
      trường hợp 18:
      trường hợp 60:
  }`
    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
