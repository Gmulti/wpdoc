const { isNull, trimEnd, isString, isUndefined } = require('lodash')
const dataCmd = require('./dataCmd')

const getNameByType = itm => {
    if (isNull(itm) || isUndefined(itm)) {
        return null
    }
    switch (itm.kind) {
        case 'bin':
            return constructBin(itm)
        case 'propertylookup':
            return `${getNameByType(itm.what)}->${getNameByType(itm.offset)}`
        case 'variable':
            return `$${itm.name}`
        case 'unary':
            return `${itm.type} ${getNameByType(itm.what)}`
        case 'boolean':
        case 'encapsed':
        case 'magic':
            return itm.raw
        case 'cast':
            return `${itm.raw} ${getNameByType(itm.what)}`
        case 'array':
            let str = ''
            for (let index = 0; index < itm.items.length; index++) {
                const res = getNameByType(itm.items[index])
                if (res) {
                    str += `${res},`
                }
            }
            return `[${str}]`
        case 'number':
            return itm.value
        case 'string':
            return `'${itm.value}'`
        case 'offsetlookup':
            return `${getNameByType(itm.what)}[${getNameByType(itm.offset)}]`
        case 'call':
            let strCall = ''
            for (let index = 0; index < itm.arguments.length; index++) {
                strCall += `${getNameByType(itm.arguments[index])},`
            }
            return `${getNameByType(itm.what)}(${trimEnd(strCall, ',')})`
        case 'constref':
            if (isString(itm.name)) {
                return itm.name
            }
            return getNameByType(itm.name)
        case 'identifier':
            return itm.name
        case 'new':
            return `class ${getNameByType(itm.what)}`
        default:
            return 'Unknown'
    }
}

const constructBin = itm => {
    return `${getNameByType(itm.left)} ${itm.type} ${getNameByType(itm.right)}`
}

module.exports = {
    0: {
        path: 'arguments[0]',
        fn: itm => {
            return { h3: getNameByType(itm).replace(/'/g, '') }
        }
    },
    1: itm => {
        let loc = ''
        if (itm.loc) {
            loc = `(Line: ${itm.loc.start.line})`
        }
        const { dir } = dataCmd.getData()
        return {
            p: `**File** : ${itm.file.replace(dir, '')} ${loc}`
        }
    },
    2: {
        path: 'arguments[1]',
        fn: itm => {
            let str = getNameByType(itm)

            return { p: `**Default argument** : ${str}` }
        }
    },
    3: itm => {
        if (itm.arguments.length < 3) {
            return [{ p: 'No argument' }]
        }
        let items = [
            {
                p: 'Arguments :'
            }
        ]

        for (let index = 2; index < itm.arguments.length; index++) {
            items = items.concat({
                p: `- ${getNameByType(itm.arguments[index])}`
            })
        }

        return items
    }
}
