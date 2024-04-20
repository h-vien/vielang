import { VieLangMPP } from '../vielangMPP'

describe('Run Test', () => {
  it('should generate the code', () => {
    const vielang = new VieLangMPP()

    const { ast, target } = vielang.compile('khai báo a = 1')
    console.log('`\n------------`')
    console.log('Compile to AST:')
    console.log(JSON.stringify(ast, null, 2))

    console.log('Compile to Target:')

    console.log(JSON.stringify(target, null, 2))
    expect(1).toBe(1)
  })
})
