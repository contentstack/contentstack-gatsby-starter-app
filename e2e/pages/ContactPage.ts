import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

interface ContactSelectors {
  heroBanner: string;
  heroTitle: string;
  pageContent: string;
}

export class ContactPage extends BasePage {
  readonly contactSelectors: ContactSelectors;

  constructor(page: Page) {
    super(page);
    this.contactSelectors = {
      heroBanner: '.hero-banner',
      heroTitle: '.hero-banner .hero-title, h1',
      pageContent: 'main',
    };
  }

  async goto(): Promise<void> {
    await super.goto('/contact-us');
  }

  async isHeroBannerVisible(): Promise<boolean> {
    return await this.page.locator(this.contactSelectors.heroBanner).isVisible();
  }

  async getPageHeading(): Promise<string | null> {
    const h1 = this.page.locator('h1').first();
    if (await h1.isVisible()) {
      return await h1.textContent();
    }
    return null;
  }

  async hasMainContent(): Promise<boolean> {
    return await this.page.locator(this.contactSelectors.pageContent).isVisible();
  }
}
