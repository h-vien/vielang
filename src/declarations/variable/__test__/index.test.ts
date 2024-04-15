import parser from '@parser'
import toPlainObject from '@parser/utils/toPlainObject'
import { VariableDeclaration } from '../declaration'

describe('declaration-variable.test', () => {
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
