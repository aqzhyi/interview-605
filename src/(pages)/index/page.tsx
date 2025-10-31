import React from 'react'
import ReactDOM from 'react-dom'
import { twMerge } from 'tailwind-merge'
import RootLayout from '~/(pages)/components/RootLayout'
import { buttonBaseStyle } from '~/styles/buttonBaseStyle'

export default function HomePage() {
  return (
    <div className='flex min-h-screen items-center justify-center gap-2 bg-zinc-50 font-sans dark:bg-black'>
      <a
        href='/running-clock.html'
        className={twMerge(buttonBaseStyle)}
      >
        RunningClock
      </a>
      <a
        href='/is-cycle-check.html'
        className={twMerge(buttonBaseStyle)}
      >
        IsCycle Check
      </a>
      <a
        href='/performance-check.html'
        className={twMerge(buttonBaseStyle)}
      >
        Performance Check
      </a>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <RootLayout>
      <HomePage />
    </RootLayout>
  </React.StrictMode>,
  document.querySelector('#root')!,
)
