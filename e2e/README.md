# E2E Test Suite

End-to-end tests for Contentstack Gatsby Starter App using [Playwright](https://playwright.dev/).

## Setup

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
# Development (port 8000)
npm run develop          # Terminal 1
npm run test:e2e         # Terminal 2

# Production build (port 9000)
npm run build && npm run serve   # Terminal 1
npm run test:e2e:prod            # Terminal 2
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run tests against dev server (port 8000) |
| `npm run test:e2e:prod` | Run tests against production build (port 9000) |
| `npm run test:e2e:headed` | Run with visible browser |
| `npm run test:e2e:debug` | Debug mode |
| `npm run test:e2e:ui` | Interactive UI |
| `npm run test:e2e:report` | View HTML report |

## Custom URL (Optional)

To use a custom URL, set `BASE_URL` in your `.env.development` or `.env.production`:

```bash
BASE_URL=http://localhost:3000
```

## Structure

```
e2e/
├── pages/     # Page Object Models
├── tests/     # Test specs
├── fixtures/  # Playwright fixtures
└── utils/     # Helpers
```
