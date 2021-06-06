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

type TemplateFunction<R> =
  | ((template: TemplateStringsArray, ...substitutions: any[]) => R)
  | ((template: string) => R)

export interface read {
  (): TemplateFunction<Promise<string>>
  sync: TemplateFunction<string>
}

export interface remove {
  (): TemplateFunction<Promise<void>>
}

export interface exists {
  (): TemplateFunction<boolean>
}

export interface write {
  (): (path: string, content: string) => Promise<void>
  sync: (path: string, content: string) => void
}

export interface io {
  io: TemplateFunction<Promise<IOReturn<string>>>
  sync: TemplateFunction<IOSyncReturn<string>>
}

export interface json {
  (): TemplateFunction<Promise<any>>
  io: TemplateFunction<Promise<IOReturn<any>>>
  sync: TemplateFunction<any>
  ioSync: TemplateFunction<IOSyncReturn<any>>
}

export function glob(template: TemplateStringsArray, ...substitutions: any[]): Promise<string[]>

export { cd, fs, fg }
