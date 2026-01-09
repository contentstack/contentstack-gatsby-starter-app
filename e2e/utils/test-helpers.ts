import { Page } from '@playwright/test';

export interface LinkData {
  text: string;
  href: string;
}

export async function getAllLinks(page: Page): Promise<LinkData[]> {
  return await page.$$eval('a', (links) =>
    links.map((link) => ({
      text: link.textContent?.trim() || '',
      href: link.getAttribute('href') || '',
    }))
  );
}

export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 10000,
} as const;
