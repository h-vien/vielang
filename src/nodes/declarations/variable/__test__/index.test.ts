import parser from '@parser'
import toPlainObject from '@parser/utils/toPlainObject'
import { VariableDeclaration } from '../declaration'

describe('Test for numeric declaration', () => {
  it('should parse the let declaration syntax normally', () => {
    const result = parser.parse(`khai báo a = 1`)
    expect(toPlainObject(result.body)).toStrictEqual({
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
            start: 13,
            end: 14
          }
        }
      ],
      kind: 'let'
    } as VariableDeclaration)
  })
  it('should parse the const declaration syntax normally', () => {
    const result = parser.parse(`hằng số a = 1`)
    expect(toPlainObject(result.body)).toStrictEqual({
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
    const result = parser.parse(`khai báo a = '1'`)
    expect(toPlainObject(result.body)).toStrictEqual({
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
    const result = parser.parse(`khai báo tên con vật = 'Nhím'`)
    expect(toPlainObject(result.body)).toStrictEqual({
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'tên con vật'
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
    expect(() => parser.parse(`Khai báo a = '1'`)).toThrow(
      new SyntaxError('Unexpected token: "Khai báo a", expected a variable declarator!')
    )
  })
})

describe('Test for null declaration', () => {
  it('should parse the null syntax normally', () => {
    const result = parser.parse(`khai báo a = null`)
    expect(toPlainObject(result.body)).toStrictEqual({
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
            start: 13,
            end: 17
          }
        }
      ],
      kind: 'let'
    } as VariableDeclaration)
  })
  it('should parse the vietnamse null syntax normally', () => {
    const result = parser.parse(`khai báo a = vô giá trị`)
    expect(toPlainObject(result.body)).toStrictEqual({
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
            start: 13,
            end: 23
          }
        }
      ],
      kind: 'let'
    } as VariableDeclaration)
  })
})
