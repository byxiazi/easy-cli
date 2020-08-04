import { isObject } from './util'
import { exists } from 'fs-extra'

export function error(err: any) {
  let message
  if (typeof err === 'string') {
    message = err
  } else if (isObject(err)) {
    message = err.message
  }

  console.error(message)
}

export function exit(code: number) {
  process.exit(code)
}
