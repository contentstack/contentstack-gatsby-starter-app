[![Contentstack](/src/images/contentstack-readme-logo.png)](https://www.contentstack.com/)

# Create a marketing website using Gatsby

About Contentstack: Contentstack is a headless CMS with an API-first approach that puts content at the centre. It is designed to simplify the process of publication by separating code from content.

About this project: Gatsby is a framework to build static websites.This Gatsby starter guide will help you to build a website using Gatsby and power its content from Contentstack.

![contentstack-gatsby-starter-app](/src/images/starter-app.png)

## Live Demo

You can check the [live demo](https://contentstack-gatsby-starter-app.vercel.app/) to get first-hand experience of the website.

## Tutorial

We have created an in-depth tutorial on how you can create a Gatsby starter website using the 'gatsby-source-contentstack' plugin and fetch its content from Contentstack.

[Build a Starter Website with Gatsby and Contentstack](https://www.contentstack.com/docs/developers/sample-apps/build-a-starter-website-with-gatsby-and-contentstack/)

## E2E Tests

End-to-end tests using [Playwright](https://playwright.dev/).

### Setup

```bash
npm install
npx playwright install chromium
```

### Run Tests

```bash
# Development (port 8000)
npm run develop          # Terminal 1
npm run test:e2e         # Terminal 2

# Production build (port 9000)
npm run build && npm run serve   # Terminal 1
npm run test:e2e:prod            # Terminal 2
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run tests against dev server (port 8000) |
| `npm run test:e2e:prod` | Run tests against production build (port 9000) |
| `npm run test:e2e:headed` | Run with visible browser |
| `npm run test:e2e:debug` | Debug mode |
| `npm run test:e2e:ui` | Interactive UI |
| `npm run test:e2e:report` | View HTML report |

**More Resources**

- [Contentstack documentation](https://www.contentstack.com/docs/)
- [Region support documentation](https://www.contentstack.com/docs/developers/selecting-region-in-contentstack-starter-apps)
- [Gatsby documentation](https://www.gatsbyjs.com/docs/)
