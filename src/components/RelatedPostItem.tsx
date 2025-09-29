import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import parser from "html-react-parser";
import { getCSData } from "../live-preview-sdk/index";
import { addEditableTags, isLiveEditTagsEnabled } from "../helper";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { ContentstackGatsby } from "gatsby-source-contentstack/live-preview";
import { jsonToHTML } from "@contentstack/utils";

/**
 * RelatedPostItem Component
 * 
 * Displays an individual related blog post item with live preview support.
 * This component fetches blog post data dynamically using the provided UID
 * and renders a clickable link to the full blog post.
 * 
 * @param uid - Unique identifier for the related blog post in Contentstack
 */
const RelatedPostItem = ({ uid }: { uid: string }) => {
  // State to store the fetched blog post data
  const [post, setPost] = useState<any>(null);

  /**
   * Fetches blog post data from Contentstack using the provided UID
   * Includes author reference data and processes HTML content
   */
  const fetchPost = async () => {
    // Get the blog_post content type from Contentstack SDK
    const contentType = getCSData.stackSdk.ContentType("blog_post");
    
    // Fetch the specific blog post entry with author references
    const entryRes = await contentType
      .Entry(uid)
      .includeReference(["author"]) // Include author data for display
      .toJSON()
      .fetch();
    
    // Process HTML content for proper rendering
    jsonToHTML({ entry: entryRes, paths: ["body"] });
    
    // Add content type UID for live preview functionality
    ContentstackGatsby.addContentTypeUidFromTypename(entryRes);
    
    // Add editable tags if live edit is enabled
    isLiveEditTagsEnabled && addEditableTags(entryRes, "blog_post");
    
    // Update state with fetched post data
    setPost(entryRes);
  };

  // Effect hook to fetch post data and set up live preview
  useEffect(() => {
    // Initial data fetch
    fetchPost();
    
    // Set up live preview listener for real-time updates
    const callbackId = ContentstackLivePreview.onLiveEdit(fetchPost);
    
    // Cleanup: unsubscribe from live preview when component unmounts
    return () => ContentstackLivePreview.unsubscribeOnEntryChange(callbackId);
  }, [uid]); // Re-run effect when UID changes

  // Show loading state while post data is being fetched
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={post.url}>
      <div>
        {/* Post title with live preview attributes */}
        <h4 {...post.$?.title}>{post.title}</h4>
        
        {/* Post body preview (first 80 characters) with live preview attributes */}
        {typeof post.body === "string" && (
          <div {...post.$?.body}>{parser(post.body.slice(0, 80))}</div>
        )}
      </div>
    </Link>
  );
};

export default RelatedPostItem;
