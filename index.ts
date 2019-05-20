import { pick, pickBy, omit, omitBy } from 'lodash/fp'

interface IFilterFn {
  (val: string, key: string): Boolean
}

interface IEnv {
  namespace?: string,
  blacklist?: [string] | IFilterFn,
  whitelist?: [string] | IFilterFn,
}

export default (options: IEnv = {}) =>
  (req: any, res: any, next: any) => {
    let env = process.env
    const namespace = options.namespace || 'window.ENV'

    if (options.whitelist) {
      if (options.whitelist instanceof Array) env = pick(options.whitelist)(env)
      else if (options.whitelist instanceof Function) env = pickBy(options.whitelist)(env)
    } else if (options.blacklist) {
      if (options.blacklist instanceof Array) env = omit(options.blacklist)(env)
      else if (options.blacklist instanceof Function) env = omitBy(options.blacklist)(env)
    }

    res.send(`${namespace} = ${JSON.stringify(env)}`)
  }