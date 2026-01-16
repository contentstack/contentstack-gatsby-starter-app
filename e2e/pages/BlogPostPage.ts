import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

interface PostSelectors {
  blogContainer: string;
  blogDetail: string;
  postTitle: string;
  postAuthor: string;
  relatedPosts: string;
}

export class BlogPostPage extends BasePage {
  readonly postSelectors: PostSelectors;

  constructor(page: Page) {
    super(page);
    this.postSelectors = {
      blogContainer: '.blog-container',
      blogDetail: '.blog-detail',
      postTitle: '.blog-detail h2',
      postAuthor: '.blog-detail span strong',
      relatedPosts: '.related-post a',
    };
  }

  async goto(slug: string = '/blog/sample-post/'): Promise<void> {
    await super.goto(slug);
  }

  async getPostTitle(): Promise<string | null> {
    return await this.page.locator(this.postSelectors.postTitle).textContent();
  }

  async getAuthorName(): Promise<string | null> {
    return await this.page.locator(this.postSelectors.postAuthor).textContent();
  }

  async isBlogDetailVisible(): Promise<boolean> {
    return await this.page.locator(this.postSelectors.blogDetail).isVisible();
  }

  async getRelatedPostsCount(): Promise<number> {
    return await this.page.locator(this.postSelectors.relatedPosts).count();
  }
}
