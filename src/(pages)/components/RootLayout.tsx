import React, { type PropsWithChildren } from 'react'
import './globals.css'

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <main className='flex min-h-screen flex-row items-center justify-center gap-4 bg-black font-mono text-white'>
      {children}
    </main>
  )
}
