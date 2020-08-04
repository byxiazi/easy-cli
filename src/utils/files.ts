import path from 'path'
import fs from 'fs-extra'
import { IObj } from '../index'

function deleteRemovedFiles(
  dir: string,
  newFiles: IObj<string>,
  previousFiles: IObj<string>
) {
  const filesToDelete = Object.keys(previousFiles).filter(
    (filename) => !newFiles[filename]
  )

  return Promise.all(
    filesToDelete.map((filename) => {
      return fs.unlink(path.join(dir, filename))
    })
  )
}

export async function writeFiles(
  dir: string,
  files: IObj<string>,
  previousFiles?: IObj<string>
) {
  if (previousFiles) {
    await deleteRemovedFiles(dir, files, previousFiles)
  }

  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name)
    fs.ensureDirSync(path.dirname(filePath))
    fs.writeFileSync(filePath, files[name])
  })
}

export function copyFiles(src: IObj<string>, dest: IObj<string>) {
  Object.keys(src).forEach((name) => {
    fs.copySync(src[name], dest[name])
  })
}
