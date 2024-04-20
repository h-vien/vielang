import { Declaration } from '@parser/nodes/declarations'

export class DeclarationTranspiler {
  transpile(declaration: Declaration) {
    if (declaration.type === 'VariableDeclaration') {
      return `${declaration.kind} ${declaration.declarations
        .map((declaration: any) => `${declaration.id.name} = ${declaration.init.value}`)
        .join(', ')}`
    }
    return declaration
  }
}
