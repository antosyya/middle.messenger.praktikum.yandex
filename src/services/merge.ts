import { Indexed } from './types'

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = { ...lhs }

  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue
    }

    if (
      rhs[p] &&
      typeof rhs[p] === 'object' &&
      !Array.isArray(rhs[p]) &&
      rhs[p] !== null
    ) {
      result[p] = merge((result[p] as Indexed) || {}, rhs[p] as Indexed)
    } else {
      result[p] = rhs[p]
    }
  }

  return result
}

export default merge
