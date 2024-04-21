import parser from '@parser'
import fs from 'fs'
import { DeclarationTranspiler } from './declarations'
import { ExpressionTranspiler } from './expressions'

/**
 *  VietLang MPP is Message-Passing processes to transpile to JavaScript code
 *
 */

export class VieLangMPP {
  compile(program: any) {
    const _program = new DeclarationTranspiler()
    const abstractSyntaxTree = parser.parse(program)

    const target = _program.transpile(abstractSyntaxTree)
    this.saveToFile('compiler/build/index.js', target)

    return {
      ast: abstractSyntaxTree,
      target
    }
  }
  saveToFile(path: string, content: any) {
    fs.writeFileSync(path, content, 'utf-8')
  }
}
