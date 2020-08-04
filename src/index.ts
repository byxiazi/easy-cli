import commander from 'commander'
import create from './create'

interface ICmd {
  [k: string]: any
  options: Array<commander.Option>
}

export interface IObj<T> {
  [k: string]: T
}

commander
  .command('create <project-name>')
  .description('create a new project by easy-cli')
  .option('-f, --force', 'Ovewrite target directory if exists')
  .action((name: string, cmd: ICmd) => {
    const options = cleanArgs(cmd)
    create(name, options)
  })

commander.parse(process.argv)

function camelize(str: string) {
  return str.replace(/-(\w)/g, (_: string, c: string) =>
    c ? c.toUpperCase() : ''
  )
}

function cleanArgs(cmd: ICmd) {
  const args: IObj<string> = {}

  cmd.options.forEach((o) => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })

  return args
}
