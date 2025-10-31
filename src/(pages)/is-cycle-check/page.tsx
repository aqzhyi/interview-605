import React from 'react'
import ReactDOM from 'react-dom'
import { twMerge } from 'tailwind-merge'
import RootLayout from '~/(pages)/components/RootLayout'
import { isCycleCheck } from '~/(pages)/is-cycle-check/utils/isCycleCheck'

/**
 * You are given a directed graph consisting of N vertices, numbered from 1 to
 * N, and N edges.
 *
 * The graph is described by two arrays, A and B, both of length N. A pair A[K],
 * B[K] (for K from 0 to N-1) describes a directed edge from vertex A[K] to
 * vertex B[K]. Note that the graph might contain self-loops (edges where A[K] =
 * B[K]) and/or multiple edges between the same pair of vertices.
 *
 * Your task is to check whether the given graph is a cycle. A graph is a cycle
 * if it is possible to start at some vertex and, by following the provided
 * edges, visit all the other vertices and return to the starting point.
 *
 * For example, A = [1, 3, 2, 4] and B = [4, 1, 3, 2] is a cycle of length 4.
 *
 * On the other hand, A = [1, 2, 3, 4] and B = [2, 1, 4, 3] is not a cycle. The
 * graph consist of two disjoint cycles of length 2 each.
 *
 * ## Task Description
 *
 * ### Write a function
 *
 * `function solution(A, B)`; that, given two arrays A and B of N integers each,
 * describing a directed graph, returns true if the graph is a cycle and false
 * otherwise.
 *
 * Examples:
 *
 * - Given A = [3, 1, 2] and B = [2, 3, 1], your function should return true.
 * - Given A = [1, 2, 1] and B = [2, 3, 3], your function should return false.
 * - Given A = [1, 2, 3, 4] and B = [2, 1, 4, 4], your function should return
 *   false.
 * - Given A = [1, 2, 3, 4] and B = [2, 1, 4, 3], your function should return
 *   false.
 * - Given A = [1, 2, 2, 3, 3] and B = [2, 3, 3, 4, 5], your function should
 *   return false.
 *
 * ### Expected Result
 *
 * Write an efficient algorithm for the following assumptions
 *
 * N is an integer within the range [1..100,000]; each element of arrays A, B is
 * an integer within the range [1..N]; arrays A and B are of equal length N.
 */
export function IsCycleCheckPage() {
  return (
    <div>
      <div className='py-4 text-2xl font-bold'>IsCycle Check Page</div>

      <div className='space-y-4'>
        <div className={groupStyle}>
          <div>(Expected: True)</div>
          <div className={codebaseStyle}>
            isCycleCheck([3, 1, 2], [2, 3, 1]) ={' '}
          </div>
          <div className={booleanStyle}>
            {String(isCycleCheck([3, 1, 2], [2, 3, 1]))}
          </div>
        </div>

        <div className={groupStyle}>
          <div>(Expected: False)</div>
          <div className={codebaseStyle}>
            isCycleCheck([1, 2, 1], [2, 3, 3]) ={' '}
          </div>
          <div className={booleanStyle}>
            {String(isCycleCheck([1, 2, 1], [2, 3, 3]))}
          </div>
        </div>

        <div className={groupStyle}>
          <div>(Expected: False)</div>
          <div className={codebaseStyle}>
            isCycleCheck([1, 2, 3, 4], [2, 1, 4, 4]) ={' '}
          </div>
          <div className={booleanStyle}>
            {String(isCycleCheck([1, 2, 3, 4], [2, 1, 4, 4]))}
          </div>
        </div>

        <div className={groupStyle}>
          <div>(Expected: False)</div>
          <div className={codebaseStyle}>
            isCycleCheck([1, 2, 3, 4], [2, 1, 4, 3]) ={' '}
          </div>
          <div className={booleanStyle}>
            {String(isCycleCheck([1, 2, 3, 4], [2, 1, 4, 3]))}
          </div>
        </div>

        <div className={groupStyle}>
          <div>(Expected: False)</div>
          <div className={codebaseStyle}>
            isCycleCheck([1, 2, 2, 3, 3], [2, 3, 3, 4, 5]) ={' '}
          </div>
          <div className={booleanStyle}>
            {String(isCycleCheck([1, 2, 2, 3, 3], [2, 3, 3, 4, 5]))}
          </div>
        </div>
      </div>
    </div>
  )
}

const codebaseStyle = twMerge(
  'font-mono bg-gray-800 text-gray-100 py-2 px-4 rounded-lg',
)
const booleanStyle = twMerge('font-mono text-blue-400')
const groupStyle = twMerge('flex flex-row gap-4 items-center')

ReactDOM.render(
  <React.StrictMode>
    <RootLayout>
      <IsCycleCheckPage />
    </RootLayout>
  </React.StrictMode>,
  document.querySelector('#root')!,
)
