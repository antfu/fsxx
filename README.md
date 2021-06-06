# fsxx

[![NPM version](https://img.shields.io/npm/v/fsxx?color=a1b858&label=)](https://www.npmjs.com/package/fsxx)

File system in [zx](https://github.com/google/zx) style.

```ts
import { cd, read, io } from 'fsxx'

console.log(await read`README.md`)

let { name } = await read.json`package.json`

const file = await io`README.md`
file.data = file.data.replace(/js/g, 'ts')
await file.save()

cd('packages')
const { data, save } = await io.json`./core/package.json`
data.version = '0.1.1'
await save()

const isMIT = read.sync`LICENSE`.includes('MIT')
```

> **EXPERIMENTAL**: APIs are very likely to be overhauled in the future.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)
