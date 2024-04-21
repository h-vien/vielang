import parser from '@parser'
import fs from 'fs'
import { transpiler } from '.'

/**
 *  VietLang MPP is Message-Passing processes to transpile to JavaScript code
 *
 */

export class VieLangMPP {
  compile(program: any) {
    const abstractSyntaxTree = parser.parse(program)

    const target = transpiler(abstractSyntaxTree).code
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
