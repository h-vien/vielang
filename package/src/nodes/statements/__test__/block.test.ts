import { parserNode } from '@parser/test'
import { Statement } from '..'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test for block', () => {
  it('should parse the block statement', () => {
    const result = parserNode.parse(
      `{
        khai báo a = 1;
        khai báo b = 2;
       }`,
      Statement
    )
    expect(toPlainObject(result)).toStrictEqual({
      type: 'BlockStatement',
      body: [
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'NumericLiteral',
                value: 1,
                extra: {
                  rawValue: 1,
                  raw: '1'
                },
                start: 23,
                end: 24
              },
              id: {
                type: 'Identifier',
                name: 'a'
              }
            }
          ],
          kind: 'let'
        },
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'NumericLiteral',
                value: 2,
                extra: {
                  rawValue: 2,
                  raw: '2'
                },
                start: 47,
                end: 48
              },
              id: {
                type: 'Identifier',
                name: 'b'
              }
            }
          ],
          kind: 'let'
        }
      ]
    })
  })
})
