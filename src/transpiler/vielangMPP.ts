import { VariableDeclaration } from '@parser/nodes/declarations/variable/declaration'
import { parserNode } from '@parser/test'
import { DeclarationTranspiler } from './declarations'
import fs from 'fs'

/**
 *  VietLang MPP is Message-Passing processes to transpile to JavaScript code
 *
 */

export class VieLangMPP {
  transpiler: DeclarationTranspiler
  constructor() {
    this.transpiler = new DeclarationTranspiler()
  }
  compile(program: any) {
    const abstractSyntaxTree = parserNode.parse(program, VariableDeclaration)
    console.log(abstractSyntaxTree, 'abstractSyntaxTree')

    const target = this.transpiler.transpile(abstractSyntaxTree)
    console.log(target)
    this.saveToFile('src/compiler/build/index.js', target)

    return {
      ast: abstractSyntaxTree,
      target
    }
  }
  saveToFile(path: string, content: any) {
    fs.writeFileSync(path, content, 'utf-8')
  }
}
