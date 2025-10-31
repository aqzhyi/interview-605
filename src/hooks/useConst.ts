import { useRef } from 'react'

/**
 * A custom hook that returns a constant value and reference.
 *
 * after you give the first parameter, always return the same reference.
 *
 * no matter how many times it renders, the callback will only execute once.
 */
export function useConst<AnyValue>(callback: () => AnyValue): AnyValue {
  const ref = useRef<{ v: AnyValue }>()

  if (!ref.current) {
    ref.current = { v: callback() }
  }

  return ref.current.v
}
