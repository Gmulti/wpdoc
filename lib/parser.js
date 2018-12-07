const schema = require('./schema')

const Parser = {
    *inorder(t) {
        if (t) {
            if (t.left) {
                yield* Parser.inorder(t.left)
            }
            if (t.kind === 'call' || t.kind === 'return') {
                if (t.kind === 'call') {
                    yield* Parser.processData(t.arguments)
                }
                yield t
            }

            if (t.kind === 'unary' || t.kind === 'cast') {
                yield t.what
            }

            if (t.kind === 'retif') {
                yield* Parser.processData([t.test, t.trueExpr, t.falseExpr])
                if (t.body) {
                    yield* Parser.processData(t.body.children)
                }
                if (t.alternate) {
                    yield* Parser.processData(t.alternate.children)
                }
            }

            if (t.kind === 'array') {
                yield* Parser.processData(t.items)
            }

            if (t.right) {
                yield* Parser.inorder(t.right)
            }
        }
    },

    *processData(data) {
        if (!data) {
            return
        }

        for (let i = 0; i < data.length; i++) {
            const val = data[i]
            if (!val) {
                continue
            }
            if (val.kind === 'return') {
                if (val.expr && val.expr.kind === 'unary') {
                    yield* Parser.processData([val.expr])
                } else if (val.expr && val.expr.kind === 'array') {
                    yield* Parser.processData(val.expr.items)
                } else {
                    yield {
                        kind: val.kind,
                        what: val.expr ? val.expr.what : null,
                        arguments:
                            val.expr && val.expr.arguments
                                ? val.expr.arguments
                                : null
                    }
                }
            }
            if (val.kind === 'cast') {
                yield val.what
            }
            if (val.kind === 'array') {
                yield* Parser.processData(val.items)
            }
            if (val.kind === 'entry') {
                yield* Parser.processData([val.value])
            }
            if (val.kind === 'assign' && val.left && val.right) {
                yield* Parser.inorder(val)
            }
            if (val.kind === 'bin' && val.left && val.right) {
                yield* Parser.inorder(val)
            }
            if (val.kind === 'if') {
                yield* Parser.inorder(val.test)
                yield* Parser.processData(val.body.children)
                if (val.alternate) {
                    let next = []
                    if (val.alternate.test) {
                        next.push(val.alternate.test)
                    }
                    if (val.alternate.body) {
                        next.push(val.alternate.body)
                    }
                    if (val.alternate.alternate) {
                        next.push(val.alternate.alternate)
                    }
                    if (val.alternate.children) {
                        yield* Parser.processData(val.alternate.children)
                    }

                    yield* Parser.processData(next)
                }
            }
            if (val.kind === 'foreach') {
                yield* Parser.processData(val.source)
                yield* Parser.processData(val.body.children)
            }
            if (val.kind === 'for') {
                yield* Parser.processData(val.body.children)
            }
            if (val.kind === 'isset') {
                yield* Parser.processData(val.arguments)
            }
            if (val.kind === 'retif') {
                yield* Parser.inorder(val.test)
                yield* Parser.processData(val.trueExpr)
                yield* Parser.processData(val.falseExpr)
                if (val.body) {
                    yield* Parser.processData(val.body.children)
                }
                if (val.alternate) {
                    yield* Parser.processData(val.alternate.children)
                }
            }
            if (val.kind === 'unary') {
                yield* Parser.processData(val.what)
                yield* Parser.processData(val.what.arguments)
            }
            if (val.kind === 'class') {
                yield* Parser.processData(val.body)
            }
            if (val.kind === 'switch') {
                yield* Parser.processData(val.body.children)
            }
            if (val.kind === 'namespace') {
                yield* Parser.processData(val.children)
            }
            if (val.kind === 'echo') {
                if (val.arguments && val.arguments) {
                    yield* Parser.processData(val.arguments)
                }
            }
            if (
                val.kind === 'method' ||
                val.kind === 'function' ||
                val.kind === 'block' ||
                val.kind === 'case' ||
                val.kind === 'try'
            ) {
                if (val.body) {
                    yield* Parser.processData(val.body.children)
                }
                if (val.children) {
                    yield* Parser.processData(val.children)
                }
            }
            if (val.kind === 'call') {
                yield* Parser.processData(val.arguments)

                yield {
                    kind: val.kind,
                    what: val.what,
                    arguments: val.arguments
                }
            }
        }
    },

    searchByWhatName(name, data) {
        let results = []
        for (let node of Parser.processData(data.children)) {
            if (!node.what || node.what.name !== name) {
                continue
            }
            results.push(node)
        }

        return results
    }
}

module.exports = {
    parser: Parser,
    schema: schema
}
