## Rules

- do NOT use any related APIs that are above that react version 17.0.1

## Principles

- follow the KISS principle
- follow the "explicit is better than implicit" principle
- follow the pure functions, pure components and immutability principles
- follow the YAGNI principle

## Code Comments

- use A2 to B1 level British English to write
- the first letter of a sentence does not need to be capitalized (except for proper nouns)

## Coding Style

- prioritise using `useState(prev => newValue)` to update state, avoid using `setState(newValue)`

## Testing

- follow F.I.R.S.T principles
- always place the `test file` next to the `file being tested` (in the same directory)
- when organizing test units, prioritize categorizing by `core functionality` and place it at the top of the file, while putting other categories afterwards
- multiple sets of similar test data with the same goal, consider using `test.each()` to write them, as this can help reduce the size of the code and improve readability
- use describe to nest test cases, but with a maximum of 3 layers

  e.g.: good

  ```ts
  describe('ComponentOrFunction', () => {
    describe('specific behaviour or scenario', () => {
      it('should do something', () => {
        // test implementation
      })
    })
  })
  ```

### Unit Tests

- the file extension is `.test.ts`

### E2E Tests

- the file extension is `.e2e.ts`
- prioritise using `getByTestId` to select elements
