import { VariableDeclaration } from '@parser/nodes/declarations/variable/declaration'
import { parserNode } from '@parser/test'
import { DeclarationTranspiler } from './declarations'
import fs from 'fs'
import { ConsoleLogExpression } from '@parser/nodes/declarations/log/console'
import { ExpressionTranspiler } from './expressions'

/**
 *  VietLang MPP is Message-Passing processes to transpile to JavaScript code
 *
 */

export class VieLangMPP {
  transpiler: DeclarationTranspiler
  constructor() {
    this.transpiler = new ExpressionTranspiler()
  }
  compile(program: any) {
    const abstractSyntaxTree = parserNode.parse(program, ConsoleLogExpression)
    console.log(abstractSyntaxTree, 'abstractSyntaxTree')

    const target = this.transpiler.transpile(abstractSyntaxTree)
    console.log(target)
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
