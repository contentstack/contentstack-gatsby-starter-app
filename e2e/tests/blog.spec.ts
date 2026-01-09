import { test, expect } from '../fixtures';

test.describe('Blog Page', () => {
  test('should load with header and footer', async ({ blogPage }) => {
    await blogPage.goto();
    expect(await blogPage.isHeaderVisible()).toBe(true);
    expect(await blogPage.isFooterVisible()).toBe(true);
  });

  test('should have correct URL', async ({ blogPage }) => {
    await blogPage.goto();
    expect(await blogPage.getCurrentUrl()).toContain('/blog');
  });

  test('should display blog container', async ({ blogPage }) => {
    await blogPage.goto();
    expect(await blogPage.isBlogContainerVisible()).toBe(true);
  });

  test('should navigate to About page', async ({ blogPage }) => {
    await blogPage.goto();
    await blogPage.clickNavItem('About');
    expect(await blogPage.getCurrentUrl()).toContain('/about');
  });

  test('should navigate home via logo', async ({ blogPage }) => {
    await blogPage.goto();
    await blogPage.clickLogo();
    expect(await blogPage.getCurrentUrl()).toMatch(/\/$|:8000\/?$/);
  });
});
