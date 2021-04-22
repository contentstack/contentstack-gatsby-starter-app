[![Contentstack](/src/images/contentstack-readme-logo.png)](https://www.contentstack.com/)

# Create a marketing website using Gatsby

About Contentstack: Contentstack is a headless CMS with an API-first approach that puts content at the centre. It is designed to simplify the process of publication by separating code from content.

About this project: Create professional marketing-themed website using Gatsby.

![contentstack-gatsby-starter-app](/src/images/readme.png)

## Live Demo

You can check the [live demo](https://contentstack-gatsby-starter-app.vercel.app/) to get first-hand experience of the website.

## Prerequisites

- Install [nodejs](https://nodejs.org/en/) on your system.
- Install Gatsby CLI.

`npm install -g gatsby-cli`

## Clone the repo

Clone the following repo. It contains all the required dependencies.

`git clone https://github.com/contentstack/contentstack-gatsby-starter-app.git`

## Install dependencies

Go to the gatsby-starter-contentstack folder, and run the following:

- `cd contentstack-gatsby-starter-app`
- `npm install`

This downloads the required files and initializes the site.

## Update Contentstack secrets

Copy the `.env.sample` file to `.env.development` and `.env.production` and update with your Contentstack details, including your API key and delivery token.

It should end up looking something like:

```
CONTENTSTACK_API_KEY='stack_api_ley'
CONTENTSTACK_DELIVERY_TOKEN='delivery_token'
CONTENTSTACK_ENVIRONMENT='publishing_environment'
CONTENTSTACK_HOSTED_URL='hosted site url'
CONTENTSTACK_CDN="optional"
```
