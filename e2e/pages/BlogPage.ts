import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

interface BlogSelectors {
  blogBanner: string;
  bannerTitle: string;
  blogContainer: string;
  blogList: string;
  blogListTitle: string;
  archiveSection: string;
  archiveTitle: string;
}

export class BlogPage extends BasePage {
  readonly blogSelectors: BlogSelectors;

  constructor(page: Page) {
    super(page);
    this.blogSelectors = {
      blogBanner: '.blog-page-banner',
      bannerTitle: '.blog-page-banner .hero-title',
      blogContainer: '.blog-container',
      blogList: '.blog-list',
      blogListTitle: '.blog-list h3',
      archiveSection: '.blog-column-right',
      archiveTitle: '.blog-column-right h2',
    };
  }

  async goto(): Promise<void> {
    await super.goto('/blog');
  }

  async isBannerVisible(): Promise<boolean> {
    return await this.page.locator(this.blogSelectors.blogBanner).isVisible();
  }

  async getBannerTitle(): Promise<string | null> {
    return await this.page.locator(this.blogSelectors.bannerTitle).textContent();
  }

  async isBlogContainerVisible(): Promise<boolean> {
    return await this.page.locator(this.blogSelectors.blogContainer).isVisible();
  }

  async getBlogPostsCount(): Promise<number> {
    return await this.page.locator(this.blogSelectors.blogList).count();
  }

  async getBlogPostTitles(): Promise<string[]> {
    return await this.page.locator(this.blogSelectors.blogListTitle).allTextContents();
  }

  async clickBlogPost(index: number = 0): Promise<void> {
    await this.page.locator(this.blogSelectors.blogList).nth(index).locator('a').first().click();
    await this.waitForPageLoad();
  }

  async isArchiveSectionVisible(): Promise<boolean> {
    return await this.page.locator(this.blogSelectors.archiveSection).isVisible();
  }

  async getArchiveTitle(): Promise<string | null> {
    return await this.page.locator(this.blogSelectors.archiveTitle).textContent();
  }
}
