import React, { useState } from 'react'
import { useConst } from '~/hooks/useConst'
import { buttonBaseStyle } from '~/styles/buttonBaseStyle'

export function CountIncrementButton() {
  const [count, setCount] = useState(() => 0)

  const increment = useConst(() => () => {
    setCount((prev) => prev + 1)
  })

  return (
    <button
      className={buttonBaseStyle}
      onClick={increment}
    >
      Increment: {count}
    </button>
  )
}
