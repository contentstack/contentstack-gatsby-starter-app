import Stack from "../live-preview-sdk"
import * as Utils from "@contentstack/utils"
import {
  BlogPostModel,
  PageModel,
  HeaderModel,
  FooterModel,
  EntryResponse,
} from "../common/types"

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true"

export const jsonToHtmlParse = (entry: EntryResponse) => {
  const renderOption = {
    ["span"]: (node: any, next: any) => next(node.children),
  }

  return Utils.jsonToHTML({
    entry,
    paths: [
      "body",
      "copyright",
      "related_post.body",
      "notification_bar.announcement_text",
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
    renderOption,
  })
}

export const getHeaderRes = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: ["notification_bar.announcement_text"],
  })) as HeaderModel[][]

  liveEdit && Utils.addEditableTags(response[0][0], "header", true)
  return response[0][0]
}

export const getFooterRes = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: "footer",
    referenceFieldPath: undefined,
    jsonRtePath: ["copyright"],
  })) as FooterModel[][]
  liveEdit && Utils.addEditableTags(response[0][0], "footer", true)
  return response[0][0]
}

export const getAllEntries = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: "page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as PageModel[][]
  liveEdit &&
    response[0].forEach(entry => Utils.addEditableTags(entry, "page", true))
  return response[0]
}

export const getPageRes = async (entryUrl: string) => {
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  })) as PageModel[]
  liveEdit && Utils.addEditableTags(response[0], "page", true)
  return response[0]
}

export const getBlogListRes = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  })) as BlogPostModel[][]
  liveEdit &&
    response[0].forEach((entry: BlogPostModel) =>
      Utils.addEditableTags(entry, "blog_post", true)
    )
  return response[0]
}

export const getBlogPostRes = async (entryUrl: string) => {
  const response = (await Stack.getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  })) as BlogPostModel[]
  liveEdit && Utils.addEditableTags(response[0], "blog_post", true)
  return response[0]
}
