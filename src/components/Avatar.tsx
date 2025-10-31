import React, { type PropsWithChildren } from 'react'

export function Avatar(props: PropsWithChildren<{}>) {
  return (
    <div className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300'>
      {props.children}
    </div>
  )
}
