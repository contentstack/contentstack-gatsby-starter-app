import { test, expect } from '../fixtures';

test.describe('Home Page', () => {
  test('should load with header and footer', async ({ homePage }) => {
    await homePage.goto();
    expect(await homePage.isHeaderVisible()).toBe(true);
    expect(await homePage.isFooterVisible()).toBe(true);
  });

  test('should have hero banner', async ({ homePage }) => {
    await homePage.goto();
    expect(await homePage.isHeroBannerVisible()).toBe(true);
  });

  test('should navigate to About page', async ({ homePage }) => {
    await homePage.goto();
    await homePage.clickNavItem('About');
    expect(await homePage.getCurrentUrl()).toContain('/about');
  });

  test('should navigate to Blog page', async ({ homePage }) => {
    await homePage.goto();
    await homePage.clickNavItem('Blog');
    expect(await homePage.getCurrentUrl()).toContain('/blog');
  });

  test('should navigate to Contact page', async ({ homePage }) => {
    await homePage.goto();
    await homePage.clickNavItem('Contact');
    expect(await homePage.getCurrentUrl()).toContain('/contact');
  });
});
