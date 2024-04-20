import { Expression } from '@parser/nodes/expressions'

export class ExpressionTranspiler {
  transpile(expression: Expression) {
    if (expression.type === 'ConsoleLogExpression') {
      return `console.log(${expression.body.map((expression: any) => expression.extra.raw).join(', ')})`
    }
    return expression
  }
}
