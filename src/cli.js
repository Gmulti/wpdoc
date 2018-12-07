#!/usr/bin/env node
const program = require('commander')
const packageJson = require('../package.json')
const cmdGenerate = require('./cmd-generate')
const commands = [
    {
        name: 'generate [dir_plugin]',
        alias: 'g',
        description: 'generate WP Documentation',
        action: cmdGenerate
    }
]

function generateFlags(option) {
    const alias = `-${option.alias}`
    const info = `--${option.name}`

    return { name: `${alias}, ${info}` }
}

program.version(packageJson.version, '-v, --version')

commands.forEach(option => {
    const { action, description, name, options } = option

    const optionTemplate = generateFlags({ name: 'template', alias: 't' })
    program
        .command(name)
        .option(`${optionTemplate.name} [template_mode]`)
        .description(description)
        .action(action)
})

program.parse(process.argv)
