const readFiles = (dirname, onFileContent, onError) => {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err)
            return
        }
        filenames.forEach(function(filename) {
            const pathFile = `${dirname}${filename}`

            if (fs.statSync(pathFile).isDirectory()) {
                readFiles(`${pathFile}/`, onFileContent, onError)
            } else {
                const data = fs.readFileSync(pathFile, 'utf-8')
                onFileContent(pathFile, data)
            }
        })
    })
}

export default readFiles
