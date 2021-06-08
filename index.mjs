import path from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { $, cd } from 'zx'

const resolve = (...args) => path.resolve($.cwd || process.cwd(), ...args)

function interpret(args) {
  // @ts-expect-error
  return typeof args[0] === 'string' ? args[0] : String.raw(...args)
}

function interpretPath(args) {
  return resolve(interpret(args))
}

async function createObject(read, write) {
  const obj = {
    data: await read(),
    save: async(data = obj.data) => {
      return await write(data)
    },
    read: async() => {
      obj.data = await read()
      return obj.data
    },
  }
  return obj
}

function createSyncObject(read, write) {
  const obj = {
    data: read(),
    save: (data = obj.data) => {
      return write(data)
    },
    read: () => {
      obj.data = read()
      return obj.data
    },
  }
  return obj
}

export function exists(...args) {
  const path = interpretPath(args)
  return fs.existsSync(resolve(path))
}

export async function remove(...args) {
  const path = interpretPath(args)
  return fs.remove(resolve(path))
}

export async function read(...args) {
  const path = interpretPath(args)
  return fs.readFile(path, 'utf-8')
}

read.sync = function(...args) {
  const path = interpretPath(args)
  return fs.readFileSync(path, 'utf-8')
}

export async function write(path, content) {
  return fs.writeFile(resolve(path), content, 'utf-8')
}

write.sync = function(path, content) {
  return fs.writeFileSync(resolve(path), content, 'utf-8')
}

export async function io(...args) {
  const path = interpretPath(args)

  return await createObject(
    () => fs.readFile(path, 'utf-8'),
    data => fs.writeFile(path, data, 'utf-8'),
  )
}

io.sync = function(...args) {
  const path = interpretPath(args)

  return createSyncObject(
    () => fs.readFileSync(path, 'utf-8'),
    data => fs.writeFileSync(path, data, 'utf-8'),
  )
}

async function jsonRead(...args) {
  const path = interpretPath(args)
  return fs.readJSON(path)
}

jsonRead.sync = function(...args) {
  const path = interpretPath(args)
  return fs.readJSONSync(path)
}

read.json = jsonRead

async function jsonIO(...args) {
  const path = interpretPath(args)

  return await createObject(
    () => fs.readJSON(path),
    data => fs.writeJSON(path, data, { spaces: jsonIO.spaces }),
  )
}

jsonIO.sync = function(...args) {
  const path = interpretPath(args)

  return createSyncObject(
    () => fs.readJSONSync(path),
    data => fs.writeJSONSync(path, data, { spaces: jsonIO.spaces }),
  )
}

jsonIO.spaces = 0

io.json = jsonIO

export function glob(...args) {
  const input = interpretPath(args)
  return fg(input, { cwd: resolve() })
}

export { cd, fs, fg }
