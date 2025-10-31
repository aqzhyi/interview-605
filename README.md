# 📝 interview-605

## ⚠️ Environment Restriction

![Nodejs-v22](https://img.shields.io/badge/Node.js-v22.20.0-black?style=for-the-badge&logo=node.js&logoColor=white&color=339933)
![pnpm-v10](https://img.shields.io/badge/pnpm-v10.20.0-black?style=for-the-badge&logo=pnpm&logoColor=white&color=F69220)
![react-v17](https://img.shields.io/badge/react-v17.0.1-black?style=for-the-badge&logo=react&logoColor=white&color=61DAFB)
![reactDOM-v17](https://img.shields.io/badge/react--DOM-v17.0.1-black?style=for-the-badge&logo=react&logoColor=white&color=61DAFB)

## ⛑️ Dev

![Vite](https://img.shields.io/badge/-Vite-252529?style=for-the-badge&logo=vite&logoColor=FCC72B)
![OxLint](https://img.shields.io/badge/oxc-%2338B2AC?style=for-the-badge&logo=eslint&logoColor=white)

```sh
pnpm run dev
open http://localhost:60733/
```

## ⏩ Testing

![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![Playwright](https://img.shields.io/badge/-Playwright-252529?style=for-the-badge&logo=googlechrome&logoColor=FCC72B)

```sh
pnpm run test
pnpm run test:e2e
```

## 👀 Code Review

> [!IMPORTANT]
>
> browser runtime preview <https://interview-605.vercel.app>

- [running-clock](<https://github.com/aqzhyi/interview-605/tree/main/src/(pages)/running-clock>)
- [is-cycle-check](<https://github.com/aqzhyi/interview-605/tree/main/src/(pages)/is-cycle-check>)
- [performance-check](<https://github.com/aqzhyi/interview-605/tree/main/src/(pages)/performance-check>)

## 🗄️ Structure

```text
src/
├── (pages)/                    # page routes
│   ├── components/             # shared page components
│   │   ├── globals.css
│   │   ├── globals.css.d.ts
│   │   └── RootLayout.tsx
│   ├── index/
│   │   └── page.tsx
│   ├── is-cycle-check/         # ⛑️ Task 2
│   │   ├── page.tsx
│   │   └── utils/
│   │       ├── isCycleCheck.test.ts
│   │       └── isCycleCheck.ts
│   ├── performance-check/      # ⛑️ Task 3
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── CountIncrementButton.tsx
│   │       ├── UserCard.tsx
│   │       └── UserList.tsx
│   ├── running-clock/          # ⛑️ Task 1
│   │   ├── page.e2e.ts
│   │   └── page.tsx
├── components/                 # reusable components
│   └── Avatar.tsx
├── hooks/                      # custom React hooks
│   ├── useConst.test.ts
│   ├── useConst.ts
│   ├── useIntervalTick.test.ts
│   └── useIntervalTick.ts
├── schemas/                    # data validation schemas
│   └── userSchema.ts
├── styles/                     # shared style definitions
│   ├── alertRedBaseStyle.ts
│   ├── buttonBaseStyle.ts
│   └── inputBaseStyle.ts
└── types/                      # TypeScript type definitions
    └── AnyAsyncFunction.ts
```
