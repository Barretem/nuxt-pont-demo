import {
  CodeGenerator,
  Interface,
  Mod,
  BaseClass,
  Surrounding,
} from 'pont-engine'
import * as pont from 'pont-engine'

export default class MyGenerator extends CodeGenerator {
  /** 获取某个基类的类型定义代码 */
  getBaseClassInDeclaration(base: BaseClass): string {
    return `class ${base.name} {
      ${base.properties
        .map((prop) => {
          // 替换 defs. 不使用 defs 命名空间
          let propertyCode = prop
            .toPropertyCode(Surrounding.typeScript, true)
            .replace(/defs\./g, '')

          if ((prop.dataType as any).reference) {
            // 这里可以通过正则将类型进行字符串的替换
            propertyCode = propertyCode
              .replace(/\?/, '')
              .replace(/content:/, 'content?:')
              .replace(/payload:/, 'payload?:')
          }
          return propertyCode
        })
        .join('\n')}
    }
    `
  }

  /** 获取所有基类的类型定义代码，一个 namespace */
  getBaseClassesInDeclaration(): string {
    const content = `namespace ${this.dataSource.name || 'defs'} {
      ${this.dataSource.baseClasses
        .map(
          (base) => `
        export ${this.getBaseClassInDeclaration(base)}
      `
        )
        .join('\n')}
    }
    `

    return content
  }

  /** 获取接口内容的类型定义代码 */
  getInterfaceContentInDeclaration(inter: Interface): string {
    let bodyParams = inter.getBodyParamsCode()
    if (bodyParams.includes('defs.')) {
      bodyParams = bodyParams.replace(/defs\./g, '')
    }
    // 这里可以将部分统一在请求拦截的参数全部剔除出来，从请求拦截的时候再添加这些参数
    const paramsCode = inter.getParamsCode().replace(/tenantId:/g, 'openId?:')

    // 将空声明清除
    const isEmptyParams = paramsCode.replace(/(\n|\s)/g, '') === 'classParams{}'

    const requestArgs = []

    !isEmptyParams && requestArgs.push('params: Params')
    bodyParams && requestArgs.push(`bodyParams: ${bodyParams}`)
    requestArgs.push(`options?: RequestConfig`)
    const requestParams = requestArgs.join(', ')

    let responseType = inter.responseType
    if (responseType.includes('defs.')) {
      responseType = responseType.replace(/defs\./g, '')
    }
    const resArr = responseType.split('<')
    const lastItem = resArr[resArr.length - 1]

    let resStr = responseType
    if (lastItem && lastItem.includes('.')) {
      resArr.splice(resArr.length - 1, 0, 'Required')
      resStr = resArr.join('<') + '>'
    }
    const urlParamsKeysStr = (inter.path.match(/(?<={)(.*?)(?=})/g) || [])
      .map((item) => `'${item}'`)
      .join('|')
    // 获取URL中的keys
    // 在params中获取对应的值
    // 额外
    return `
      ${isEmptyParams ? '' : 'export ' + paramsCode}
      export type ResponseType = Promise<${resStr}>
      ${
        urlParamsKeysStr ? `export type UrlParamType = ${urlParamsKeysStr}` : ''
      }
      export function getUrl(${
        urlParamsKeysStr ? 'params: Pick<Params, UrlParamType>' : ''
      }): string;
      export function request(${requestParams}): ResponseType;
    `
  }

  /** 获取公共的类型定义代码 */
  getCommonDeclaration(): string {
    return `
    import {RequestConfig} from "@/utils/fetch";
    type Required<T> = { [P in keyof T]-?: T[P] };
    type Pick<T, K extends keyof T> = { [P in K]: T[P] };
    `
  }

  /** 获取接口实现内容的代码 */
  getInterfaceContent(inter: Interface): string {
    const bodyParams = inter.getBodyParamsCode()
    const paramsCode = inter.getParamsCode()
    const isEmptyParams = paramsCode.replace(/(\n|\s)/g, '') === 'classParams{}'
    const contentType =
      inter.consumes && inter.consumes.length
        ? inter.consumes[0]
        : 'application/json'

    const requestArgs: string[] = []
    !isEmptyParams && requestArgs.push(`params`)
    bodyParams && requestArgs.push(`bodyParams`)
    requestArgs.push('options')
    const requestParams = requestArgs.join(', ')
    const urlParamsKeysStr = (inter.path.match(/(?<={)(.*?)(?=})/g) || [])
      .map((item) => `'${item}'`)
      .join('|')

    return `
    import { fetch, urlResolve } from "@/utils/fetch";

    const getWholePath = (path: string): string => {
      const prefix = ''
      return prefix + path
    }
    /**
     * @desc 获取请求的URL
     */
    export function getUrl(${urlParamsKeysStr ? 'paramsObj' : ''}) {
      return urlResolve(getWholePath('${inter.path}')${
      urlParamsKeysStr ? ', paramsObj' : ''
    })
    }

    /**
     * @desc ${inter.description}
     */
    export function request(${requestParams}) {
      const fetchOption = Object.assign({
        url: getWholePath('${inter.path}'),
        method: '${inter.method}',
        headers: {
          'Content-Type': '${contentType}'
        },
        ${isEmptyParams ? '' : '' + 'params: params,'}
        ${bodyParams ? 'data: bodyParams' : ''}
      },
      options)
      return fetch(fetchOption);
    }
   `
  }

  /** 获取单个模块的 index 入口文件 */
  getModIndex(mod: Mod): string {
    return `
      /**
       * @description ${mod.description}
       */
      ${mod.interfaces
        .map((inter) => {
          return `import * as ${inter.name} from './${inter.name}';`
        })
        .join('\n')}

      export {
        ${mod.interfaces.map((inter) => inter.name).join(', \n')}
      }
    `
  }

  /** 获取所有模块的 index 入口文件 */
  getModsIndex(): string {
    let conclusion = `
      export const API = {
        ${this.dataSource.mods.map((mod) => mod.name).join(', \n')}
      };
    `

    // dataSource name means multiple dataSource
    if (this.dataSource.name) {
      conclusion = `
        export const ${this.dataSource.name} = {
          ${this.dataSource.mods.map((mod) => mod.name).join(', \n')}
        };
      `
    }

    return `
      ${this.dataSource.mods
        .map((mod) => {
          return `import * as ${mod.name} from './${mod.name}';`
        })
        .join('\n')}

      ${conclusion}
    `
  }

  /** 获取接口类和基类的总的 index 入口文件代码 */
  getIndex(): string {
    let conclusion = `
      export * from './mods/';
    `

    // dataSource name means multiple dataSource
    if (this.dataSource.name) {
      conclusion = `
        export { ${this.dataSource.name} } from "./mods/";
      `
    }

    return conclusion
  }
}

export class FileStructures extends pont.FileStructures {
  getModsDeclaration(originCode: string): string {
    return `
      export ${originCode}
    `
  }

  getBaseClassesInDeclaration(originCode: string): string {
    return `
      export ${originCode}
    `
  }

  getDataSourcesDeclarationTs(): string {
    const dsNames = (this as any).generators.map(
      (ge: any) => ge.dataSource.name
    )

    return `
      ${dsNames
        .map((name: any) => {
          return `export {${name}} from './${name}/api';`
        })
        .join('\n')}
      export as namespace defs;
    `
  }

  getDataSourcesTs(): string {
    const dsNames = (this as any).generators.map(
      (ge: { dataSource: { name: any } }) => ge.dataSource.name
    )

    return `
      ${dsNames
        .map((name: any) => {
          return `import { ${name} } from "./${name}";`
        })
        .join('\n')}
      import defs from './api';

      export type apitype = typeof defs;
      export const api = {${dsNames.join(',')}} as apitype;

    `
  }
}
