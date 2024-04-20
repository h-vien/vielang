import { VieLangMPP } from '../vielangMPP'

describe('Run Test', () => {
  it('should generate the code', () => {
    const vs = new VieLangMPP()

    const { ast, target } = vs.compile(42)
    console.log('`\n------------`')
    console.log('Compile to AST:')
    console.log(JSON.stringify(ast, null, 2))

    console.log('Compile to Target:')

    console.log(target)
    expect(1).toBe(1)
  })
})
