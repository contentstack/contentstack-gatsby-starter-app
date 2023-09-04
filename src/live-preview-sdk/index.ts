import { ContentstackGatsby } from "gatsby-source-contentstack/live-preview";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export const livePreview = new ContentstackGatsby({
    api_key: process.env.CONTENTSTACK_API_KEY,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    live_preview: {
        management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
        enable: process.env.CONTENTSTACK_LIVE_PREVIEW === "true",
        host: process.env.CONTENTSTACK_API_HOST,
    },
    jsonRteToHtml: process.env.CONTENTSTACK_JSON_RTE_TO_HTML === "true",
});

ContentstackLivePreview.init({
    stackSdk: livePreview.stackSdk,
})
