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

export interface read {
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

export declare const remove: {
  (str: string): Promise<void>
  (template: TemplateStringsArray, ...substitutions: any[]): Promise<void>
}

export declare const exists: {
  (str: string): boolean
  (template: TemplateStringsArray, ...substitutions: any[]): boolean
}

export declare const write: {
  (path: string, content: string): Promise<void>
  sync(path: string, content: string): void
}

export declare const io: {
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

export function glob(template: TemplateStringsArray, ...substitutions: any[]): Promise<string[]>

export { cd, fs, fg }
