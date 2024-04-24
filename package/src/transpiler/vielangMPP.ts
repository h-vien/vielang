import { transpiler } from '.'
import parser from '@parser/init-parser'

/**
 *  VietLang MPP is Message-Passing processes to transpile to JavaScript code
 *
 */

export class VieLangMPP {
  compile(program: any) {
    const abstractSyntaxTree = parser.parse(program)

    const target = transpiler(abstractSyntaxTree).code

    return {
      ast: abstractSyntaxTree,
      target
    }
  }
}
