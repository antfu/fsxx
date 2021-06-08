import fs from 'fs-extra'
import fg from 'fast-glob'
import { cd } from 'zx'

export interface IOReturn<T> {
  data: T
  save(v?: T): Promise<void>
  read(): T
}

export interface IOSyncReturn<T> {
  data: T
  save(v?: T): void
  read(): T
}

type TemplateFunction<R = any> =
  | (<T extends R>(template: TemplateStringsArray, ...substitutions: any[]) => T)
  | (<T extends R>(template: string) => T)

type TemplateFunctionPromised<R = any> =
| (<T extends R>(template: TemplateStringsArray, ...substitutions: any[]) => Promise<T>)
| (<T extends R>(template: string) => Promise<T>)

export interface read {
  (): TemplateFunction<Promise<string>>
  sync: TemplateFunction<string>
  json: {
    (): TemplateFunctionPromised
    sync: TemplateFunction
  }
}

export declare const remove: {
  (): TemplateFunction<Promise<void>>
}

export declare const exists: {
  (): TemplateFunction<boolean>
}

export declare const write: {
  (): (path: string, content: string) => Promise<void>
  sync: (path: string, content: string) => void
}

export declare const io: {
  (): TemplateFunction<Promise<IOReturn<string>>>
  sync: TemplateFunction<IOSyncReturn<string>>
  json: {
    (): TemplateFunction<Promise<IOReturn<any>>>
    sync: TemplateFunction<IOSyncReturn<any>>
    spaces: number
  }
}

export function glob(template: TemplateStringsArray, ...substitutions: any[]): Promise<string[]>

export { cd, fs, fg }
