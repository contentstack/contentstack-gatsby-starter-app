import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

interface AboutSelectors {
  heroBanner: string;
  heroTitle: string;
  teamSection: string;
  teamMembers: string;
}

export class AboutPage extends BasePage {
  readonly aboutSelectors: AboutSelectors;

  constructor(page: Page) {
    super(page);
    this.aboutSelectors = {
      heroBanner: '.hero-banner',
      heroTitle: '.hero-banner .hero-title',
      teamSection: '.about-team-section',
      teamMembers: '.team-content .team-details',
    };
  }

  async goto(): Promise<void> {
    await super.goto('/about-us');
  }

  async isHeroBannerVisible(): Promise<boolean> {
    return await this.page.locator(this.aboutSelectors.heroBanner).isVisible();
  }

  async getHeroTitle(): Promise<string | null> {
    return await this.page.locator(this.aboutSelectors.heroTitle).textContent();
  }

  async isTeamSectionVisible(): Promise<boolean> {
    return await this.page.locator(this.aboutSelectors.teamSection).isVisible();
  }

  async getTeamMembersCount(): Promise<number> {
    return await this.page.locator(this.aboutSelectors.teamMembers).count();
  }
}
