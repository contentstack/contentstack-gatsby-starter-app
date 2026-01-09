import { Page, Locator } from '@playwright/test';

export interface BaseSelectors {
  header: string;
  headerLogo: string;
  headerNavItems: string;
  footer: string;
  footerNav: string;
  footerSocialLinks: string;
  copyright: string;
}

export class BasePage {
  readonly page: Page;
  readonly selectors: BaseSelectors;

  constructor(page: Page) {
    this.page = page;
    this.selectors = {
      header: 'header',
      headerLogo: 'header .logo',
      headerNavItems: 'header .nav-li',
      footer: 'footer',
      footerNav: 'footer .nav-ul',
      footerSocialLinks: 'footer .social-nav a',
      copyright: '.copyright',
    };
  }

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async isHeaderVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.header).isVisible();
  }

  async isFooterVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.footer).isVisible();
  }

  async getHeaderNavItems(): Promise<string[]> {
    await this.page.locator(this.selectors.headerNavItems).first().waitFor({ state: 'visible' });
    return await this.page.locator(`${this.selectors.headerNavItems} a`).allTextContents();
  }

  async clickNavItem(text: string): Promise<void> {
    const currentUrl = this.page.url();
    const link = this.page.locator(`${this.selectors.headerNavItems} a`).filter({ hasText: text });
    await link.click();
    await this.page.waitForFunction(
      (oldUrl) => window.location.href !== oldUrl,
      currentUrl,
      { timeout: 10000 }
    );
    await this.waitForPageLoad();
  }

  async getFooterNavItems(): Promise<string[]> {
    return await this.page.locator(`${this.selectors.footerNav} a`).allTextContents();
  }

  async getFooterSocialLinksCount(): Promise<number> {
    return await this.page.locator(this.selectors.footerSocialLinks).count();
  }

  async getCopyrightText(): Promise<string | null> {
    return await this.page.locator(this.selectors.copyright).textContent();
  }

  async clickLogo(): Promise<void> {
    const currentUrl = this.page.url();
    await this.page.waitForTimeout(200);
    await this.page.evaluate(() => {
      const logo = document.querySelector('header .logo') as HTMLElement;
      if (logo) {
        const link = logo.closest('a') as HTMLAnchorElement;
        if (link) link.click();
        else logo.click();
      }
    });
    if (!currentUrl.match(/\/$|:8000\/?$/)) {
      await this.page.waitForFunction(
        (oldUrl) => window.location.href !== oldUrl,
        currentUrl,
        { timeout: 10000 }
      );
    }
    await this.waitForPageLoad();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
