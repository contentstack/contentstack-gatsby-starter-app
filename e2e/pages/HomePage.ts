import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

interface HomeSelectors {
  heroBanner: string;
  heroTitle: string;
  featuredBlogs: string;
  blogTitle: string;
}

export class HomePage extends BasePage {
  readonly homeSelectors: HomeSelectors;

  constructor(page: Page) {
    super(page);
    this.homeSelectors = {
      heroBanner: '.hero-banner',
      heroTitle: '.hero-banner .hero-title',
      featuredBlogs: '.home-featured-blogs .featured-blog',
      blogTitle: '.featured-blog h3',
    };
  }

  async goto(): Promise<void> {
    await super.goto('/');
  }

  async isHeroBannerVisible(): Promise<boolean> {
    return await this.page.locator(this.homeSelectors.heroBanner).isVisible();
  }

  async getHeroTitle(): Promise<string | null> {
    return await this.page.locator(this.homeSelectors.heroTitle).textContent();
  }

  async getFeaturedBlogsCount(): Promise<number> {
    return await this.page.locator(this.homeSelectors.featuredBlogs).count();
  }

  async clickFeaturedBlog(index: number = 0): Promise<void> {
    const currentUrl = this.page.url();
    const link = this.page.locator(this.homeSelectors.featuredBlogs).nth(index).locator('a').first();
    await link.click();
    await this.page.waitForFunction(
      (oldUrl) => window.location.href !== oldUrl,
      currentUrl,
      { timeout: 10000 }
    );
    await this.waitForPageLoad();
  }
}
