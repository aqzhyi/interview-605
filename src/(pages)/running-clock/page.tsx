import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useConst } from '~/hooks/useConst'
import { useIntervalTick } from '~/hooks/useIntervalTick'
import { buttonBaseStyle } from '~/styles/buttonBaseStyle'
import { inputBaseStyle } from '~/styles/inputBaseStyle'
import RootLayout from '~/(pages)/components/RootLayout'

/**
 * Your task is to implement a React component that renders a running-clock that
 * will count down time until it reaches 0 minutes and 0 seconds (00:00).
 *
 * implement a running-clock that receives its time value from user inputs and
 * allows the user to start, pause/resume the countdown and reset the clock. In
 * order to satisfy the task's requirements, you need to implement the
 * following:
 *
 * 1. Time display:
 *
 * - time is displayed in `<h1 data-testid="running-clock">` and its initial value
 *   is 00:00; time is displayed in mm:ss format; 1 minute, 5 seconds should be
 *   displayed as: 01:05; 1 minute, 65 seconds should be displayed as: 02:05.
 *
 * 2. Input
 *
 * - changing input values does not change the value displayed in <h1
 *   data-testid="running-clock">; inputs do not need to have max or min
 *   attributes; the clock doesn't need to handle negative values; this is not a
 *   part of the solution and will not be evaluated.
 *
 * 3. Behavior
 *
 *    1. On a START button click, set the clock value displayed in <h1
 *          data-testid="running-clock"> with the time calculated from the
 *          inputs and start counting down;
 *    2. Once the clock is running, update the displayed time every second;
 *    3. Once the clock is running and the START button is clicked, restart the clock
 *          with the same time originally provided in the inputs;
 *    4. Once the countdown is done and the clock reaches 00:00, stop counting and
 *          keep displaying 00:00;
 *    5. On a PAUSE / RESUME button click, pause or resume the clock appropriately:
 *
 *          - PAUSE puts the countdown on hold;
 *          - RESUME resumes the countdown from where it left off; . Once the RESET button
 *                     is clicked, both inputs should be reset to 0;
 *    6. Once the RESET button is clicked, the time displayed in <h1
 *          data-testid="running-clock"> should be reset to 00:00.
 *
 * ## Implementation hints & notice
 *
 * - Do not clear the inputs on a START button click.
 * - Use the same button element for both pause and resume actions.
 * - The following elements are used in tests and therefore must not be changed:
 *
 *   - `<input>` labels;
 *   - `<button>` texts;
 *   - `<h1>element data-testid attribute value.</h1>`
 *
 * ## Hints
 *
 * - Only imports from the react module are allowed.
 * - Your solution will be evaluated based on its correctness.
 * - Design/styling is not assessed and will not affect the score. You should
 *   focus only on implementing the requirements.
 */
export function RunningClockPage() {
  const minutesInputRef = useRef<HTMLInputElement>(null)
  const secondsInputRef = useRef<HTMLInputElement>(null)
  const isEnabledRef = useRef(false)
  const [totalSeconds, setTotalSeconds] = useState(() => 0)

  const toggleEnabled = useConst(() => () => {
    isEnabledRef.current = !isEnabledRef.current
  })

  const displayTime = useConst(() => (totalSeconds: number) => {
    const displayMinutes = Math.floor(totalSeconds / 60)
    const displaySeconds = totalSeconds % 60
    return `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`
  })

  const start = useConst(() => () => {
    const minutes = Number(minutesInputRef.current!.value)
    const seconds = Number(secondsInputRef.current!.value)
    const total = minutes * 60 + seconds
    setTotalSeconds(() => total)

    if (!isEnabledRef.current) {
      isEnabledRef.current = true
    }
  })

  const reset = useConst(() => () => {
    minutesInputRef.current!.value = '0'
    secondsInputRef.current!.value = '0'
    isEnabledRef.current = false
    setTotalSeconds(() => 0)
  })

  useIntervalTick({
    refreshInterval: 1000,
    enabled: () => isEnabledRef.current,
    onTick: () => {
      setTotalSeconds((prev) => {
        if (prev > 0) {
          return prev - 1
        }
        return 0
      })
    },
  })

  return (
    <div className='w-dvw space-y-4 px-8'>
      <div
        aria-label='Task implementation area'
        className='space-x-4 border border-zinc-500 p-8'
      >
        <label>
          <input
            data-testid='minutes-input'
            type='number'
            className={inputBaseStyle}
            defaultValue={0}
            ref={minutesInputRef}
          />
          Minutes
        </label>

        <label>
          <input
            data-testid='seconds-input'
            type='number'
            className={inputBaseStyle}
            defaultValue={0}
            ref={secondsInputRef}
          />
          Seconds
        </label>

        <button
          data-testid='start'
          className={buttonBaseStyle}
          onClick={start}
        >
          🚀 START
        </button>

        <button
          data-testid='pause-resume'
          className={buttonBaseStyle}
          onClick={toggleEnabled}
        >
          ⏩ RESUME / ⏸️ PAUSE
        </button>

        <button
          data-testid='reset'
          className={buttonBaseStyle}
          onClick={reset}
        >
          ♻️ RESET
        </button>

        <h1 data-testid='running-clock'>{displayTime(totalSeconds)}</h1>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <RootLayout>
      <RunningClockPage />
    </RootLayout>
  </React.StrictMode>,
  document.querySelector('#root')!,
)
