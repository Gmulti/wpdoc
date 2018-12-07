const fs = require('fs')
const path = require('path')

function* walkSync(dir) {
    const files = fs.readdirSync(dir)

    for (const file of files) {
        const pathToFile = path.join(dir, file)
        const isDirectory = fs.statSync(pathToFile).isDirectory()
        if (isDirectory) {
            yield* walkSync(pathToFile)
        } else {
            if (pathToFile.indexOf('.php') >= 0) {
                yield pathToFile
            }
        }
    }
}

module.exports = walkSync
