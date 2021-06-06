import assert from 'assert'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import task from 'tasuku'
// @ts-expect-error
import { json, read, write, cd, io, remove, exists, fs } from '../index.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

await task('json', async() => {
  assert((await json`package.json`).name === 'fsxx')
})

await task('cd + read', async() => {
  cd('.github')
  assert((await read`FUNDING.yml`).includes('antfu'))
})

await task('io', async() => {
  const ts = Date.now().toString()

  cd('test')

  await write('__test', ts)
  assert(exists`__test`)

  const file = await io`__test`
  assert(file.data === ts)
  assert(fs.readFileSync(join(__dirname, '__test'), 'utf-8') === ts)

  file.data = '123'
  await file.save()

  assert(file.data === '123')
  assert(read.sync`__test` === '123')
  await remove`__test`
})
