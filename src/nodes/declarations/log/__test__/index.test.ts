import { parserNode } from '@parser/test'
import { ConsoleLogExpression } from '../console'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test for console.log', () => {
  it('should parse the console.log syntax normally', () => {
    const result = parserNode.parse(`console.log('Hello World')`, ConsoleLogExpression)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'ConsoleLogExpression',
      body: [
        {
          type: 'StringLiteral',
          value: 'Hello World',
          extra: {
            rawValue: 'Hello World',
            raw: '"Hello World"'
          },
          start: 12,
          end: 25
        }
      ],
      optional: false
    })
  })
  it('should parse the vietnamese console.log syntax normally', () => {
    const result = parserNode.parse(`in ra('Chào thế giới')`, ConsoleLogExpression)
    console.log(JSON.stringify(result, null, 2))
    expect(toPlainObject(result)).toStrictEqual({
      type: 'ConsoleLogExpression',
      body: [
        {
          type: 'StringLiteral',
          value: 'Chào thế giới',
          extra: {
            rawValue: 'Chào thế giới',
            raw: '"Chào thế giới"'
          },
          start: 6,
          end: 21
        }
      ],
      optional: false
    })
  })
})
