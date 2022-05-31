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

interface Read {
  (str: string): Promise<string>
  (template: TemplateStringsArray, ...substitutions: any[]): Promise<string>

  sync(str: string): string
  sync(template: TemplateStringsArray, ...substitutions: any[]): string

  json: {
    <T>(str: string): Promise<T>
    <T>(template: TemplateStringsArray, ...substitutions: any[]): Promise<T>

    sync<T>(str: string): T
    sync<T>(template: TemplateStringsArray, ...substitutions: any[]): T
  }
}

interface Remove {
  (str: string): Promise<void>
  (template: TemplateStringsArray, ...substitutions: any[]): Promise<void>
}

interface Exists {
  (str: string): boolean
  (template: TemplateStringsArray, ...substitutions: any[]): boolean
}

interface Write {
  (path: string, content: string): Promise<void>
  sync(path: string, content: string): void
}

interface IO {
  (str: string): Promise<IOReturn<string>>
  (template: TemplateStringsArray, ...substitutions: any[]): Promise<IOReturn<string>>

  sync(str: string): IOSyncReturn<string>
  sync(template: TemplateStringsArray, ...substitutions: any[]): IOSyncReturn<string>

  json: {
    <T>(str: string): Promise<IOReturn<T>>
    <T>(template: TemplateStringsArray, ...substitutions: any[]): Promise<IOReturn<T>>

    sync<T>(str: string): IOSyncReturn<T>
    sync<T>(template: TemplateStringsArray, ...substitutions: any[]): IOSyncReturn<T>

    spaces: number
  }
}

export declare const read: Read
export declare const write: Write
export declare const remove: Remove
export declare const exists: Exists
export declare const io: IO

export function glob(template: TemplateStringsArray, ...substitutions: any[]): Promise<string[]>

export { cd, fs, fg }
