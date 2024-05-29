import { parserNode } from '@parser/test'
import { BreakStatement } from '../../break'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Do break statement test', () => {
  it('Should parse break statement correctly', () => {
    const result = parserNode.parse(`phá huỷ`, BreakStatement)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'BreakStatement',
      label: null
    })
  })
})
