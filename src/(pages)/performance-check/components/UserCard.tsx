import React, { memo } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { Avatar } from '~/components/Avatar'

export const UserCard = memo(function UserCard(props: {
  username: string
  firstName: string
  lastName: string
  image: string
}) {
  return (
    <Fragment>
      <Avatar>
        <img
          width={40}
          height={40}
          alt={props.username}
          src={props.image}
        />
      </Avatar>
      <div>{props.firstName}</div>
      <div>{props.lastName}</div>
    </Fragment>
  )
})
