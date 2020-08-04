import { IObj } from '../index'

export function isObject(obj: any) {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(obj: any) {
  return Array.isArray(obj)
}

export function deepMerge(to: IObj<any>, from: IObj<any>) {
  for (let key in from) {
    if (!isArray(to[key]) && isArray(from[key])) {
      to[key] = []
    } else if (!isPlainObject(to[key]) && isPlainObject(from[key])) {
      to[key] = {}
    }
    isObject(from[key]) ? deepMerge(to[key], from[key]) : (to[key] = from[key])
  }
}
