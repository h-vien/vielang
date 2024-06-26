import toPlainObject from '@parser/utils/toPlainObject'
import { VariableDeclaration } from '../declaration'
import { parserNode } from '@parser/test'

describe('Test for numeric declaration', () => {
  it('should parse the let declaration syntax normally', () => {
    const result = parserNode.parse(`khai báo tên = "Viên Huỳnh"`, VariableDeclaration)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          init: {
            type: 'StringLiteral',
            start: 15,
            end: 27,
            value: 'Viên Huỳnh',
            extra: {
              rawValue: 'Viên Huỳnh',
              raw: '"Viên Huỳnh"'
            }
          },
          id: {
            type: 'Identifier',
            name: 't_234n'
          }
        }
      ],
      kind: 'let'
    })
  })
  it('should parse the const declaration syntax normally', () => {
    const result = parserNode.parse(`hằng số a = 1`, VariableDeclaration)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a'
          },
          init: {
            type: 'NumericLiteral',
            value: 1,
            extra: {
              rawValue: 1,
              raw: '1'
            },
            start: 12,
            end: 13
          }
        }
      ],
      kind: 'const'
    } as VariableDeclaration)
  })
})

describe('Test for string declaration', () => {
  it('should parse the string syntax normally', () => {
    const result = parserNode.parse(`khai báo a = '1'`, VariableDeclaration)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a'
          },
          init: {
            type: 'StringLiteral',
            value: '1',
            extra: {
              rawValue: '1',
              raw: '"1"'
            },
            start: 13,
            end: 16
          }
        }
      ],
      kind: 'let'
    } as VariableDeclaration)
  })
  it('should parse the string syntax normally', () => {
    const result = parserNode.parse(`khai báo tên con vật = 'Nhím'`, VariableDeclaration)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 't_234n_con_v_7853t'
          },
          init: {
            type: 'StringLiteral',
            value: 'Nhím',
            extra: {
              rawValue: 'Nhím',
              raw: '"Nhím"'
            },
            start: 23,
            end: 29
          }
        }
      ],
      kind: 'let'
    } as VariableDeclaration)
  })
  it('should throw error', () => {
    expect(() => parserNode.parse(`Khai báo a = '1'`, VariableDeclaration)).toThrow(
      new SyntaxError('Unexpected token: "Khai báo a", expected a variable declarator!')
    )
  })
})

describe('Test for null declaration', () => {
  it('should parse the vietnamse null syntax normally', () => {
    const result = parserNode.parse(`khai báo a = vô giá trị`, VariableDeclaration)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'a'
          },
          init: {
            type: 'NullLiteral',
            start: 12,
            end: 22
          }
        }
      ],
      kind: 'let'
    } as VariableDeclaration)
  })
})
