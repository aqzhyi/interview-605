import { describe, expect, it } from 'vitest'
import { isCycleCheck } from './isCycleCheck'

describe('isCycleCheck', () => {
  describe('core functionality - valid single cycles', () => {
    it.each([
      {
        description: 'cycle of length 2',
        A: [1, 2],
        B: [2, 1],
      },
      {
        description: 'cycle of length 3',
        A: [3, 1, 2],
        B: [2, 3, 1],
      },
      {
        description: 'cycle of length 4',
        A: [1, 3, 2, 4],
        B: [4, 1, 3, 2],
      },
      {
        description: 'single vertex cycle (self-loop)',
        A: [1],
        B: [1],
      },
    ])('should return true for $description', ({ A, B }) => {
      const result = isCycleCheck(A, B)

      expect(result).toBe(true)
    })

    it('should return true for large cycle with maximum vertices', () => {
      const N = 100_000
      const A = Array.from({ length: N }, (_, i) => i + 1)
      const B = Array.from({ length: N }, (_, i) => ((i + 1) % N) + 1)

      const result = isCycleCheck(A, B)

      expect(result).toBe(true)
    })
  })

  describe('core functionality - invalid graphs', () => {
    describe('multiple disjoint cycles', () => {
      it.each([
        {
          description: 'two separate cycles of length 2',
          A: [1, 2, 3, 4],
          B: [2, 1, 4, 3],
        },
        {
          description: 'disconnected components',
          A: [1, 2, 2, 3, 3],
          B: [2, 3, 3, 4, 5],
        },
      ])('should return false for $description', ({ A, B }) => {
        const result = isCycleCheck(A, B)

        expect(result).toBe(false)
      })
    })

    describe('incorrect edge structure', () => {
      it.each([
        {
          description: 'vertex has multiple outgoing edges',
          A: [1, 2, 1],
          B: [2, 3, 3],
        },
        {
          description: 'edges do not form a complete cycle',
          A: [1, 2, 3, 4],
          B: [2, 1, 4, 4],
        },
        {
          description: 'vertex has no outgoing edge',
          A: [1, 2],
          B: [2, 3],
        },
        {
          description: 'multiple edges point to same vertex',
          A: [1, 2, 3],
          B: [2, 2, 1],
        },
        {
          description: 'chain without cycle',
          A: [1, 2, 3],
          B: [2, 3, 4],
        },
      ])('should return false when $description', ({ A, B }) => {
        const result = isCycleCheck(A, B)

        expect(result).toBe(false)
      })
    })

    describe('self-loops in invalid context', () => {
      it.each([
        {
          description: 'self-loop is not the only edge',
          A: [1, 2],
          B: [1, 3],
        },
        {
          description: 'vertex has both self-loop and other edge',
          A: [1, 1, 2],
          B: [1, 2, 3],
        },
      ])('should return false when $description', ({ A, B }) => {
        const result = isCycleCheck(A, B)

        expect(result).toBe(false)
      })
    })
  })

  describe('edge cases', () => {
    it('should return false for empty arrays', () => {
      const A: number[] = []
      const B: number[] = []

      const result = isCycleCheck(A, B)

      expect(result).toBe(false)
    })
  })
})
