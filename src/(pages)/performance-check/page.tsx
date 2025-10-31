import React from 'react'
import ReactDOM from 'react-dom'
import RootLayout from '~/(pages)/components/RootLayout'
import { CountIncrementButton } from '~/(pages)/performance-check/components/CountIncrementButton'
import { UserList } from '~/(pages)/performance-check/components/UserList'

/**
 * You are given a React component that fetches and displays a list of users in
 * real time. It also have a counting button logic, click one time add one.
 * However, it has performance issues.
 *
 * Questions:
 *
 * 1. What are the performance issues in the following component?
 * 2. How would you optimize it?
 * 3. Rewrite the component with your optimizations.
 *
 * @example
 *   // the problematic component
 *   export const UserList = () => {
 *     const [users, setUsers] = useState([])
 *     const [count, setCount] = useState(0)
 *
 *     useEffect(() => {
 *       fetch('https://api.example.com/users')
 *         .then((res) => res.json())
 *         .then((data) => setUsers(data))
 *     }, [])
 *
 *     return (
 *       <div>
 *         <h2>User List</h2>
 *         <button onClick={() => setCount(count + 1)}>
 *           Increment: {count}
 *         </button>
 *         <ul>
 *           {users.map((user) => (
 *             <li key={user.id}>{user.name}</li>
 *           ))}
 *         </ul>
 *       </div>
 *     )
 *   }
 */
export function PerformanceCheckPage() {
  return (
    <div>
      <h2>User List</h2>
      <CountIncrementButton />
      <UserList />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <RootLayout>
      <PerformanceCheckPage />
    </RootLayout>
  </React.StrictMode>,
  document.querySelector('#root')!,
)
