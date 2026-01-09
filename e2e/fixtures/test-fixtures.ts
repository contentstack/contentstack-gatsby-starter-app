import { test as base } from '@playwright/test';
import { HomePage, AboutPage, BlogPage, BlogPostPage, ContactPage } from '../pages';

export interface TestFixtures {
  homePage: HomePage;
  aboutPage: AboutPage;
  blogPage: BlogPage;
  blogPostPage: BlogPostPage;
  contactPage: ContactPage;
}

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  blogPage: async ({ page }, use) => {
    await use(new BlogPage(page));
  },
  blogPostPage: async ({ page }, use) => {
    await use(new BlogPostPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
});

export { expect } from '@playwright/test';
