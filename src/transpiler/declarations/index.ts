import { Declaration } from '@parser/nodes/declarations'
import { Statement } from '@parser/nodes/statements'

export class DeclarationTranspiler {
  body: any = []
  transpile(declaration: Declaration) {
    if (declaration.type === 'Program') {
      for (const node of declaration.body) {
        if (node.type === 'VariableDeclaration') {
          console.log(JSON.stringify(node, null, 2), 'node')
          this.body.push(
            `${node.kind} ${node.declarations
              .map((declaration: any) => {
                console.log(declaration, 'declaration')
                return `${declaration.id.name} = ${declaration.init.extra.raw}`
              })
              .join(', ')}`
          )
        }
      }
    }
    return this.body.join('\n')
  }
}
