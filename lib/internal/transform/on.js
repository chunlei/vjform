import { resolveGetter, resolveDeal } from '../../utils/transform'
import { getFunctionResult } from './func'
import { createTransform } from 'json-to-object'

export const getOnFunction = (value, options) => {
  return (...args) => {
    const { context, providers } = options

    return getFunctionResult(
      providers
        .reduce((pre, cur) => pre.useProvider(cur), createTransform())
        .useContext({ ...context, arguments: [...args] })
        .transform(value),
      options
    )
  }
}

export default (prop, owner) => {
  return resolveGetter('on')(prop, owner)
    ? resolveDeal((value, options) => getOnFunction(value, options), false)
    : null
}
