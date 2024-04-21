import parser from '@parser'
import { Program } from '@parser/program'

describe('Test for program', () => {
  it('Should return a program object', () => {
    const result = parser.parse(
      `   khai báo tuổi = 25;
          khai báo tên = "Tú Nguyễn";
        `,
      Program
    )
    console.log(JSON.stringify(result, null, 2), 'result')
  })
})
