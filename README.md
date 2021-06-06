# fsxx

[![NPM version](https://img.shields.io/npm/v/fsxx?color=a1b858&label=)](https://www.npmjs.com/package/fsxx)

File system in [zx](https://github.com/google/zx) style.

```ts
import { cd, read, json, io } from 'fsxx'

console.log(await read`README.md`)

let { name } = await json`package.json`

cd('packages')
const { data, save } = await json.io`./core/package.json`
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
