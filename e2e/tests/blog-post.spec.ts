import { test, expect } from '../fixtures';

test.describe('Blog Post Page', () => {
  test('should navigate to blog post from listing', async ({ blogPage }) => {
    await blogPage.goto();
    const postsCount = await blogPage.getBlogPostsCount();
    if (postsCount > 0) {
      await blogPage.clickBlogPost(0);
      expect(await blogPage.getCurrentUrl()).toContain('/blog');
    }
  });

  test('should display blog post content', async ({ blogPage, page }) => {
    await blogPage.goto();
    const postsCount = await blogPage.getBlogPostsCount();
    if (postsCount > 0) {
      await blogPage.clickBlogPost(0);
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('should display blog post title', async ({ blogPage, page }) => {
    await blogPage.goto();
    const postsCount = await blogPage.getBlogPostsCount();
    if (postsCount > 0) {
      await blogPage.clickBlogPost(0);
      const title = page.locator('.blog-detail h2');
      await expect(title).toBeVisible();
    }
  });
});
