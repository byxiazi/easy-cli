import path from 'path'
import fs from 'fs'
import Mustache from 'mustache'
import Generator from './Generator'
import { gitInit } from './shell'
import { IObj } from './index'
import { deepMerge } from './utils'

export default class CreateApp {
  name: string
  targetDir: string
  generator: Generator
  constructor(name: string, targetDir: string) {
    this.name = name
    this.targetDir = targetDir
    this.generator = new Generator()
  }

  init = (isTS: boolean) => {
    const srcPath = path.join(this.targetDir, 'src')
    const scriptsPath = path.join(this.targetDir, 'scripts')
    this.generator.mkdirs(srcPath)
    this.generator.mkdirs(scriptsPath)

    let temp = fs.readFileSync(
      path.resolve(__dirname, '..', 'templates/.gitignore.tpl'),
      'utf-8'
    )
    this.generator.writeFiles(this.targetDir, {
      '.gitignore': temp,
    })
    this.generator.copyFiles(
      {
        verifyCommitMsg: path.resolve(
          __dirname,
          '..',
          'templates/verify-commit-msg.js'
        ),
      },
      {
        verifyCommitMsg: path.join(scriptsPath, 'verify-commit-msg.js'),
      }
    )

    if (isTS) {
      this.addTSTemplate()
    } else {
      this.addJSTemplate()
    }
  }

  addIndexTemplate = (isTS: boolean) => {
    const filename = isTS ? 'index.ts' : 'index.js'
    this.generator.writeFiles(path.join(this.targetDir, 'src'), {
      [filename]: `console.log('hello, ${this.name}')`,
    })
  }

  addJSTemplate = () => {
    this.addIndexTemplate(false)
    this.addPkgTemplate(false)
    this.addWebpackTemplate()
    this.copyTemplates(
      ['.eslintignore', '.eslintrc.js'],
      path.resolve(__dirname, '..', 'templates'),
      this.targetDir
    )
  }

  addWebpackTemplate = () => {
    let temp = fs.readFileSync(
      path.resolve(__dirname, '..', 'templates/webpack.config.tpl'),
      'utf-8'
    )
    temp = Mustache.render(temp, {
      projectName: this.name,
      libName: this.name
        .replace(/^[^a-zA-Z_$]*/, '')
        .replace(/-(.)/g, function (_, $1) {
          if (typeof $1 === 'string') {
            return $1.toUpperCase()
          }
          return ''
        }),
    })
    this.generator.writeFiles(this.targetDir, {
      'webpack.config.js': temp,
    })
  }

  addTSTemplate = () => {
    this.addIndexTemplate(true)
    this.addPkgTemplate(true)
    this.copyTemplates(
      ['tsconfig.json', 'tslint.json'],
      path.resolve(__dirname, '..', 'templates'),
      this.targetDir
    )
  }

  addPkgTemplate = (isTS: boolean) => {
    const pkg = require('../templates/package.json')
    const pkgConfig = require('../templates/package.config.json')

    let temp = pkgConfig.js
    if (isTS) {
      temp = pkgConfig.ts
    }

    deepMerge(pkg, temp)

    this.generator.writeFiles(this.targetDir, {
      'package.json': JSON.stringify(pkg, null, 2),
    })
  }

  copyTemplates = (
    files: string[],
    srcDir: string,
    destDir: string,
    options?: IObj<string>
  ) => {
    const srcFiles: IObj<string> = {}
    const destFiles: IObj<string> = {}

    files.forEach((item) => {
      srcFiles[item] = path.join(srcDir, item)
      destFiles[item] = path.join(destDir, (options && options[item]) || item)
    })

    this.generator.copyFiles(srcFiles, destFiles)
  }

  create(options: IObj<string>) {
    let isTS = true
    if (options.script === 'JavaScript') {
      isTS = false
    }
    this.init(isTS)
    this.afterCreated()
  }

  afterCreated() {
    gitInit(this.targetDir)
  }
}
