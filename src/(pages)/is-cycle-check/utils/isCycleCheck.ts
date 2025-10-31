/**
 * check whether the given directed graph is a single complete cycle
 *
 * a graph is a valid cycle if:
 *
 * 1. each vertex has exactly one outgoing edge
 * 2. each vertex has exactly one incoming edge
 * 3. starting from any vertex, you can visit all vertices exactly once and return
 *    to the start
 */
export function isCycleCheck(A: number[], B: number[]): boolean {
  const N = A.length

  // edge case: empty graph is not a valid cycle
  if (N === 0) {
    return false
  }

  // step 1: build adjacency map and check out-degree
  // each vertex must have exactly one outgoing edge
  const nextVertex = new Map<number, number>()

  for (let index = 0; index < N; index++) {
    const from = A[index]!
    const to = B[index]!

    // if a vertex already has an outgoing edge, it violates the single cycle rule
    if (nextVertex.has(from)) {
      return false
    }

    nextVertex.set(from, to)
  }

  // step 2: check in-degree
  // each vertex must have exactly one incoming edge
  const inDegree = new Map<number, number>()

  for (const to of B) {
    inDegree.set(to, (inDegree.get(to) || 0) + 1)

    // early exit if any vertex has more than one incoming edge
    if (inDegree.get(to)! > 1) {
      return false
    }
  }

  // step 3: follow the path starting from the first vertex
  // we'll count how many steps it takes to return to the starting point
  let current = A[0]!
  const startVertex = current
  let steps = 0

  do {
    const next = nextVertex.get(current)

    // if we can't find the next vertex, the graph is incomplete
    if (next === undefined) {
      return false
    }

    current = next
    steps++

    // safety check: prevent infinite loop (shouldn't happen with correct input)
    if (steps > N) {
      return false
    }
  } while (current !== startVertex)

  // step 4: verify we visited exactly N vertices
  // if steps === N, we visited all vertices exactly once and returned to start
  return steps === N
}
