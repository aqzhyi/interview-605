import { test, expect } from '@playwright/test'

test.describe('Running Clock', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/running-clock.html')
  })

  test.describe('Limitations when implementation', () => {
    test('Changing input values does not change the displayed time', async ({
      page,
    }) => {
      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('00:00')

      await page.getByTestId('minutes-input').fill('5')
      await page.getByTestId('seconds-input').fill('30')

      await expect(clock).toHaveText('00:00')
    })

    test('Changing input values while clock is running does not affect displayed time', async ({
      page,
    }) => {
      await page.getByTestId('minutes-input').fill('0')
      await page.getByTestId('seconds-input').fill('5')
      await page.getByTestId('start').click()

      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('00:05')

      await page.getByTestId('minutes-input').fill('10')
      await page.getByTestId('seconds-input').fill('30')

      await page.waitForTimeout(1000)
      await expect(clock).toHaveText('00:04')
    })

    test('START button does not clear input values', async ({ page }) => {
      await page.getByTestId('minutes-input').fill('2')
      await page.getByTestId('seconds-input').fill('30')
      await page.getByTestId('start').click()

      await expect(page.getByTestId('minutes-input')).toHaveValue('2')
      await expect(page.getByTestId('seconds-input')).toHaveValue('30')
    })
  })

  test.describe('Time display', () => {
    test('Initial value is 00:00', async ({ page }) => {
      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('00:00')
    })

    test('Time is displayed in mm:ss format - 1 minute 5 seconds as 01:05', async ({
      page,
    }) => {
      await page.getByTestId('minutes-input').fill('1')
      await page.getByTestId('seconds-input').fill('5')
      await page.getByTestId('start').click()

      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('01:05')
    })

    test('Time is displayed in mm:ss format - 1 minute 65 seconds as 02:05', async ({
      page,
    }) => {
      await page.getByTestId('minutes-input').fill('1')
      await page.getByTestId('seconds-input').fill('65')
      await page.getByTestId('start').click()

      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('02:05')
    })
  })

  test.describe('Behavior', () => {
    test('1. On START button click, set clock value from inputs and start counting down', async ({
      page,
    }) => {
      await page.getByTestId('minutes-input').fill('1')
      await page.getByTestId('seconds-input').fill('5')
      await page.getByTestId('start').click()

      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('01:05')

      await page.waitForTimeout(1000)
      await expect(clock).toHaveText('01:04')
    })

    test('2. Update displayed time every second once clock is running', async ({
      page,
    }) => {
      await page.getByTestId('minutes-input').fill('0')
      await page.getByTestId('seconds-input').fill('3')
      await page.getByTestId('start').click()

      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('00:03')

      await page.waitForTimeout(1000)
      await expect(clock).toHaveText('00:02')

      await page.waitForTimeout(1000)
      await expect(clock).toHaveText('00:01')
    })

    test('3. Once running and START clicked, restart clock with same time', async ({
      page,
    }) => {
      await page.getByTestId('minutes-input').fill('0')
      await page.getByTestId('seconds-input').fill('5')
      await page.getByTestId('start').click()

      await page.waitForTimeout(2000)

      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('00:03')

      await page.getByTestId('start').click()
      await expect(clock).toHaveText('00:05')
    })

    test('4. Once countdown reaches 00:00, stop counting and keep displaying 00:00', async ({
      page,
    }) => {
      await page.getByTestId('minutes-input').fill('0')
      await page.getByTestId('seconds-input').fill('2')
      await page.getByTestId('start').click()

      const clock = page.getByTestId('running-clock')

      await page.waitForTimeout(2000)
      await expect(clock).toHaveText('00:00')

      await page.waitForTimeout(1000)
      await expect(clock).toHaveText('00:00')
    })

    test('5-1. PAUSE button puts countdown on hold', async ({ page }) => {
      await page.getByTestId('minutes-input').fill('0')
      await page.getByTestId('seconds-input').fill('5')
      await page.getByTestId('start').click()

      await page.waitForTimeout(1000)

      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('00:04')

      await page.getByTestId('pause-resume').click()

      await page.waitForTimeout(2000)
      await expect(clock).toHaveText('00:04')
    })

    test('5-2. RESUME button resumes countdown from where it left off', async ({
      page,
    }) => {
      await page.getByTestId('minutes-input').fill('0')
      await page.getByTestId('seconds-input').fill('5')
      await page.getByTestId('start').click()

      await page.waitForTimeout(1000)

      const clock = page.getByTestId('running-clock')
      await expect(clock).toHaveText('00:04')

      await page.getByTestId('pause-resume').click()

      await page.waitForTimeout(1000)
      await expect(clock).toHaveText('00:04')

      await page.getByTestId('pause-resume').click()

      await page.waitForTimeout(1000)
      await expect(clock).toHaveText('00:03')
    })

    test('6-1. RESET button resets inputs to 0', async ({ page }) => {
      await page.getByTestId('minutes-input').fill('2')
      await page.getByTestId('seconds-input').fill('30')

      await page.getByTestId('reset').click()

      await expect(page.getByTestId('minutes-input')).toHaveValue('0')
      await expect(page.getByTestId('seconds-input')).toHaveValue('0')
    })

    test('6-2. RESET button resets time display to 00:00', async ({ page }) => {
      await page.getByTestId('minutes-input').fill('0')
      await page.getByTestId('seconds-input').fill('5')
      await page.getByTestId('start').click()

      await page.waitForTimeout(1000)

      await page.getByTestId('reset').click()

      await expect(page.getByTestId('running-clock')).toHaveText('00:00')
    })
  })
})
