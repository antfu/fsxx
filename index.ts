import { $ } from 'zx'

export function cwd() {
  return $.cwd || 'hi'
}

console.log(cwd())
