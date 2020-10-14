import shell from 'shelljs'

export function gitInit(targetDir: string) {
  shell.cd(targetDir)

  if (shell.exec('git init').code !== 0) {
    shell.echo('Error: Git init failed')
    shell.exit(1)
  }
}
