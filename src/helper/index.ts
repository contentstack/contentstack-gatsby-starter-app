import * as Utils from "@contentstack/utils"

export const isLiveEditTagsEnabled = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const isJsonRteToHtmlEnabled = process.env.CONTENTSTACK_JSON_RTE_TO_HTML === "true"

export const addEditableTags = (entry: any, contentTypeUid: string, locale?: string) => {
  Utils.addEditableTags(entry, contentTypeUid, true, locale)
}

export const jsonToHtmlParse = (entry: any) => {
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
