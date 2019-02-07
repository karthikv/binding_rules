import * as ts from "typescript"
import * as Lint from "tslint"

export class Rule extends Lint.Rules.AbstractRule {
  static metadata: Lint.IRuleMetadata = {
    ruleName: "no-arrow-class-property",
    description: "Enforces no arrow function class properties",
    optionsDescription: "Not configurable.",
    options: null,
    optionExamples: [true],
    rationale:
      "Prefer a decorator or binding in the constructor to arrow function class properties.",
    type: "functionality",
    typescriptOnly: false,
  }

  static FAILURE_STRING =
    "Avoid arrow function class properties. Prefer a decorator or binding in the constructor."

  apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk)
  }
}

function walk(ctx: Lint.WalkContext<void>): void {
  ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
    if (
      ts.isPropertyDeclaration(node) &&
      node.initializer &&
      ts.isArrowFunction(node.initializer)
    ) {
      ctx.addFailureAtNode(node.name, Rule.FAILURE_STRING)
    }
    return ts.forEachChild(node, cb)
  })
}
