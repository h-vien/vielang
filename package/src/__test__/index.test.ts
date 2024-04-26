import { Program } from '@parser/program'
import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test for program', () => {
  it('Should return a program with multiple constant declaration', () => {
    const code = `   hằng số tuổi = 20; hằng số địa chỉ = "Đà Nẵng";
    hằng số tên = "Viên Huỳnh";
  `
    const result = parserNode.parse(code, Program)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'NumericLiteral',
                value: 20,
                extra: {
                  rawValue: 20,
                  raw: '20'
                },
                start: 18,
                end: 20
              },
              id: {
                type: 'Identifier',
                name: 'tu_7893i'
              }
            }
          ],
          kind: 'const'
        },
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'StringLiteral',
                value: 'Đà Nẵng',
                extra: {
                  rawValue: 'Đà Nẵng',
                  raw: '"Đà Nẵng"'
                },
                start: 40,
                end: 49
              },
              id: {
                type: 'Identifier',
                name: '_273_7883a_ch_7881'
              }
            }
          ],
          kind: 'const'
        },
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'StringLiteral',
                value: 'Viên Huỳnh',
                extra: {
                  rawValue: 'Viên Huỳnh',
                  raw: '"Viên Huỳnh"'
                },
                start: 69,
                end: 81
              },
              id: {
                type: 'Identifier',
                name: 't_234n'
              }
            }
          ],
          kind: 'const'
        }
      ]
    })
  })
})
