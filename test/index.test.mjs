import assert from 'assert'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import task from 'tasuku'
import { cd, exists, fs, io, read, remove, write } from '../index.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = dirname(__dirname)

await task('json', async () => {
  assert((await read.json`package.json`).name === 'fsxx')
})

await task('cd + read', async () => {
  cd(join(root, '.github'))
  assert((await read`FUNDING.yml`).includes('antfu'))
})

await task('io', async () => {
  const ts = Date.now().toString()

  cd(join(root, 'test'))

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

await task('io.json', async () => {
  cd(join(root, 'test'))

  await write('__test.json', '{ "name": "Hello" }')
  assert(exists`__test.json`)

  const file = await io.json`__test.json`
  assert(file.data.name === 'Hello')
  file.data.name = 'World'

  await file.save()
  assert(fs.readJSONSync(join(__dirname, '__test.json'), 'utf-8').name = 'World')

  await remove`__test.json`
})
