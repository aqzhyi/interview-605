import React from 'react'
import useSWR from 'swr'
import { UserCard } from '~/(pages)/performance-check/components/UserCard'
import { userSchema } from '~/schemas/userSchema'
import { alertRedBaseStyle } from '~/styles/alertRedBaseStyle'

const API_URL = 'https://dummyjson.com/users'

export function UserList() {
  const {
    data: users,
    error,
    isValidating,
  } = useSWR(API_URL, {
    fetcher: async (url) => {
      const searchParams = new URLSearchParams({ limit: '10' })
      const resourceUrl = `${url}?${searchParams.toString()}`

      return await fetch(resourceUrl)
        .then((response) => response.json())
        .then((json) => userSchema.array().parse(json.users))
    },
  })

  return (
    <ul className='space-y-2'>
      {isValidating && (
        <div className='text-blue-500'>Loading... (dummyjson.com/users)</div>
      )}
      {error && <div className={alertRedBaseStyle}>{error.message}</div>}
      {users?.map((user) => (
        <li
          key={user.id}
          className='flex flex-row items-center gap-2'
        >
          <UserCard {...user} />
        </li>
      ))}
    </ul>
  )
}
