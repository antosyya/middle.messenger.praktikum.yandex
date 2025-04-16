export function isEqual(
  lhs: Record<string, any> | null | undefined,
  rhs: Record<string, any> | null | undefined
): boolean {
  if (
    (typeof lhs === 'object' && lhs === null) ||
    lhs === undefined ||
    (typeof rhs === 'object' && rhs === null) ||
    rhs === undefined
  ) {
    return lhs === rhs
  }

  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false
  }

  for (const key in lhs) {
    if (
      typeof lhs[key] === 'object' &&
      typeof rhs[key] === 'object' &&
      !isEqual(lhs[key], rhs[key])
    ) {
      return false
    }

    if (lhs[key] !== rhs[key]) {
      return false
    }
  }
  return true
}
