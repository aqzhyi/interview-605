import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { useConst } from './useConst'

// helper function for testing
const fn = () => 'hello'

describe('useConst', () => {
  describe('core functionality', () => {
    it('should return the value from the callback on first render', () => {
      const expectedValue = { id: 1, name: 'test' }
      const callback = vi.fn(() => expectedValue)

      const { result } = renderHook(() => useConst(callback))

      expect(result.current).toBe(expectedValue)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should return the same reference across re-renders', () => {
      const callback = vi.fn(() => ({ id: 1, name: 'test' }))

      const { result, rerender } = renderHook(() => useConst(callback))

      const firstRenderValue = result.current
      rerender()
      const secondRenderValue = result.current
      rerender()
      const thirdRenderValue = result.current

      expect(firstRenderValue).toBe(secondRenderValue)
      expect(secondRenderValue).toBe(thirdRenderValue)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should only call the callback once regardless of re-renders', () => {
      const callback = vi.fn(() => 'constant value')

      const { rerender } = renderHook(() => useConst(callback))

      rerender()
      rerender()
      rerender()

      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should work with primitive values', () => {
      const numberCallback = vi.fn(() => 42)
      const stringCallback = vi.fn(() => 'hello')
      const booleanCallback = vi.fn(() => true)

      const { result: numberResult } = renderHook(() =>
        useConst(numberCallback),
      )
      const { result: stringResult } = renderHook(() =>
        useConst(stringCallback),
      )
      const { result: booleanResult } = renderHook(() =>
        useConst(booleanCallback),
      )

      expect(numberResult.current).toBe(42)
      expect(stringResult.current).toBe('hello')
      expect(booleanResult.current).toBe(true)
    })

    it('should work with complex objects', () => {
      const complexObject = {
        nested: { value: 'test' },
        array: [1, 2, 3],
        fn: () => 'function',
      }
      const callback = vi.fn(() => complexObject)

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe(complexObject)
      rerender()
      expect(result.current).toBe(complexObject)
      expect(result.current.nested).toBe(complexObject.nested)
      expect(result.current.array).toBe(complexObject.array)
    })

    it('should work with functions as values', () => {
      const callback = vi.fn(() => fn)

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe(fn)
      expect(result.current()).toBe('hello')
      rerender()
      expect(result.current).toBe(fn)
    })

    it('should work with arrays', () => {
      const array = [1, 2, 3, 4, 5]
      const callback = vi.fn(() => array)

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe(array)
      rerender()
      expect(result.current).toBe(array)
    })
  })

  describe('edge cases', () => {
    it('should handle null value', () => {
      const callback = vi.fn(() => null)

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe(null)
      rerender()
      expect(result.current).toBe(null)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle undefined value', () => {
      const callback = vi.fn(() => {})

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe(undefined)
      rerender()
      expect(result.current).toBe(undefined)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle empty string', () => {
      const callback = vi.fn(() => '')

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe('')
      rerender()
      expect(result.current).toBe('')
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle zero value', () => {
      const callback = vi.fn(() => 0)

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe(0)
      rerender()
      expect(result.current).toBe(0)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle false value', () => {
      const callback = vi.fn(() => false)

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe(false)
      rerender()
      expect(result.current).toBe(false)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle empty object', () => {
      const callback = vi.fn(() => ({}))

      const { result, rerender } = renderHook(() => useConst(callback))

      const firstValue = result.current
      expect(firstValue).toEqual({})
      rerender()
      expect(result.current).toBe(firstValue)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle empty array', () => {
      const callback = vi.fn(() => [])

      const { result, rerender } = renderHook(() => useConst(callback))

      const firstValue = result.current
      expect(firstValue).toEqual([])
      rerender()
      expect(result.current).toBe(firstValue)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle NaN value', () => {
      const callback = vi.fn(() => Number.NaN)

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe(Number.NaN)
      rerender()
      expect(result.current).toBe(Number.NaN)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle callback that throws on subsequent calls', () => {
      let callCount = 0
      const callback = vi.fn(() => {
        callCount++
        if (callCount > 1) {
          throw new Error('Should not be called again')
        }
        return 'success'
      })

      const { result, rerender } = renderHook(() => useConst(callback))

      expect(result.current).toBe('success')
      expect(() => rerender()).not.toThrow()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should handle expensive computation callback', () => {
      const expensiveComputation = vi.fn(() => {
        let sum = 0
        for (let i = 0; i < 1000; i++) {
          sum += i
        }
        return sum
      })

      const { result, rerender } = renderHook(() =>
        useConst(expensiveComputation),
      )

      const expectedSum = 499_500
      expect(result.current).toBe(expectedSum)
      rerender()
      rerender()
      expect(expensiveComputation).toHaveBeenCalledTimes(1)
    })
  })

  describe('reference stability', () => {
    it('should maintain reference stability for Date objects', () => {
      const callback = vi.fn(() => new Date('2025-10-31'))

      const { result, rerender } = renderHook(() => useConst(callback))

      const firstDate = result.current
      rerender()
      const secondDate = result.current

      expect(firstDate).toBe(secondDate)
      expect(firstDate.getTime()).toBe(secondDate.getTime())
    })

    it('should maintain reference stability for Map objects', () => {
      const map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ])
      const callback = vi.fn(() => map)

      const { result, rerender } = renderHook(() => useConst(callback))

      const firstMap = result.current
      rerender()
      const secondMap = result.current

      expect(firstMap).toBe(secondMap)
      expect(firstMap).toBe(map)
    })

    it('should maintain reference stability for Set objects', () => {
      const set = new Set([1, 2, 3, 4, 5])
      const callback = vi.fn(() => set)

      const { result, rerender } = renderHook(() => useConst(callback))

      const firstSet = result.current
      rerender()
      const secondSet = result.current

      expect(firstSet).toBe(secondSet)
      expect(firstSet).toBe(set)
    })

    it('should maintain reference stability for RegExp objects', () => {
      const regex = /test/g
      const callback = vi.fn(() => regex)

      const { result, rerender } = renderHook(() => useConst(callback))

      const firstRegex = result.current
      rerender()
      const secondRegex = result.current

      expect(firstRegex).toBe(secondRegex)
      expect(firstRegex).toBe(regex)
    })

    it('should maintain reference stability when callback is redefined', () => {
      let value = { id: 1 }

      const { result, rerender } = renderHook(({ cb }) => useConst(cb), {
        initialProps: { cb: () => value },
      })

      const firstValue = result.current

      // Rerender with a new callback that returns a different value
      rerender({ cb: () => ({ id: 2 }) })

      expect(result.current).toBe(firstValue)
      expect(result.current.id).toBe(1)
    })
  })

  describe('type safety', () => {
    it('should work with generic types', () => {
      interface User {
        id: number
        name: string
      }

      const callback = vi.fn((): User => ({ id: 1, name: 'John' }))

      const { result } = renderHook(() => useConst<User>(callback))

      expect(result.current.id).toBe(1)
      expect(result.current.name).toBe('John')
    })

    it('should work with union types', () => {
      type Value = string | number | null

      const stringCallback = vi.fn((): Value => 'string')
      const numberCallback = vi.fn((): Value => 42)
      const nullCallback = vi.fn((): Value => null)

      const { result: stringResult } = renderHook(() =>
        useConst<Value>(stringCallback),
      )
      const { result: numberResult } = renderHook(() =>
        useConst<Value>(numberCallback),
      )
      const { result: nullResult } = renderHook(() =>
        useConst<Value>(nullCallback),
      )

      expect(stringResult.current).toBe('string')
      expect(numberResult.current).toBe(42)
      expect(nullResult.current).toBe(null)
    })
  })
})
