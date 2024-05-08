import { parserNode } from '@parser/test'
import { CallExpression } from '../call'
import { Expression } from '..'
import { ExpressionStatement } from '@parser/nodes/statements/expression'
import toPlainObject from '@parser/utils/toPlainObject'

describe('expression-call.test', () => {
  it('should parse the syntax normally', () => {
    const result = parserNode.parse('console.log("hehe")', Expression)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'console'
        },
        property: {
          type: 'Identifier',
          name: 'log'
        },
        computed: false,
        optional: false
      },
      arguments: [
        {
          type: 'StringLiteral',
          value: 'hehe',
          extra: {
            rawValue: 'hehe',
            raw: '"hehe"'
          },
          start: 12,
          end: 18
        }
      ],
      optional: false
    })
  })
})
