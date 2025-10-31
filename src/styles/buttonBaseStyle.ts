import { twMerge } from 'tailwind-merge'

export const buttonBaseStyle = twMerge(
  'rounded-2xl bg-zinc-800 px-4 py-2 text-amber-50 pointer cursor-pointer hover:bg-zinc-700 transition-colors',
)
