const path = require('path')
const fs = require('fs')
const engine = require('php-parser')
const { map, flatMapDeep } = require('lodash')
const Parser = require('../lib/parser')
const { morphism } = require('morphism')
const json2md = require('json2md')
const walkSync = require('../lib/walkSync')

module.exports = (dir, options) => {
    const engineParser = new engine({
        parser: {
            extractDoc: true
        },
        ast: {
            withPositions: true
        }
    })

    const { parser, schema } = Parser

    let results = []
    for (let file of walkSync(dir)) {
        try {
            const data = engineParser.parseCode(fs.readFileSync(file, 'utf-8'))

            let searchData = parser.searchByWhatName('apply_filters', data)
            searchData = map(searchData, itm => {
                return { ...itm, file: file }
            })
            results = results.concat(searchData)
        } catch (error) {
            console.log('Error : ', error)
        }
    }

    fs.writeFileSync(
        path.join(__dirname + '/../file_parse.json'),
        JSON.stringify(results)
    )

    let dataMorph = morphism(schema, results)

    dataMorph = flatMapDeep(dataMorph, itm => {
        return map(Object.keys(itm), key => {
            return itm[key]
        })
    })

    fs.writeFileSync(path.join(__dirname + '/../file.md'), json2md(dataMorph))
    fs.writeFileSync(
        path.join(__dirname + '/../file.json'),
        JSON.stringify(dataMorph)
    )
}
