import fs from 'fs-extra'
import { IObj } from './index'
import { writeFiles, copyFiles } from './utils/'

export default class Generator {
  mkdirs(dir: string, options?: number | object) {
    fs.ensureDirSync(dir)
  }

  writeFiles(dir: string, files: IObj<string>) {
    writeFiles(dir, files)
  }

  copyFiles(src: IObj<string>, dest: IObj<string>) {
    copyFiles(src, dest)
  }

  readJson(file: string) {
    return fs.readJsonSync(file)
  }
}
