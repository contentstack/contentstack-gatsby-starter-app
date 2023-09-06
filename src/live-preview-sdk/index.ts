import { ContentstackGatsby } from "gatsby-source-contentstack/live-preview";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

const isBrowser = typeof window !== "undefined"

let livePreview: ContentstackGatsby;

if (isBrowser) {
  livePreview = new ContentstackGatsby({
    api_key: process.env.CONTENTSTACK_API_KEY,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    live_preview: {
      management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
      enable: process.env.CONTENTSTACK_LIVE_PREVIEW === "true",
      host: process.env.CONTENTSTACK_API_HOST,
    },
    jsonRteToHtml: true,
  });

  ContentstackLivePreview.init({
    stackSdk: livePreview.stackSdk,
  })
}

export { livePreview };
