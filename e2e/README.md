# E2E Test Suite

End-to-end tests for Contentstack Gatsby Starter App using [Playwright](https://playwright.dev/).

## Setup

```bash
cd e2e
npm install
npx playwright install chromium
```

## Run Tests

```bash
# Start Gatsby app first (in another terminal)
cd contentstack-gatsby-starter-app
npm run develop

# Run tests
cd e2e
npm test              # Headless
npm run test:headed   # With browser
npm run test:debug    # Debug mode
```

## Structure

```
e2e/
├── pages/          # Page Object Models
├── tests/          # Test specs
├── fixtures/       # Playwright fixtures
└── utils/          # Helpers
```

## Configuration

Set `BASE_URL` in `.env.development`:

```
BASE_URL=http://localhost:8000
```
