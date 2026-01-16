import { test, expect } from '../fixtures';

test.describe('Site Navigation', () => {
  test('should have consistent nav across pages', async ({ homePage, aboutPage, blogPage }) => {
    await homePage.goto();
    const homeNav = await homePage.getHeaderNavItems();

    await aboutPage.goto();
    const aboutNav = await aboutPage.getHeaderNavItems();

    await blogPage.goto();
    const blogNav = await blogPage.getHeaderNavItems();

    expect(homeNav.length).toBe(aboutNav.length);
    expect(aboutNav.length).toBe(blogNav.length);
  });

  test('should complete user journey home to blog to home', async ({ homePage, blogPage }) => {
    await homePage.goto();
    expect(await homePage.isHeroBannerVisible()).toBe(true);

    await homePage.clickNavItem('Blog');
    expect(await blogPage.isBlogContainerVisible()).toBe(true);

    await blogPage.clickLogo();
    expect(await homePage.getCurrentUrl()).toMatch(/\/$|:8000\/?$/);
  });
});
