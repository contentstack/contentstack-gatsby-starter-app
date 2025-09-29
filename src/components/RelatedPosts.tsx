import React from "react";
import RelatedPostItem from "./RelatedPostItem";

/**
 * Props interface for RelatedPosts component
 */
interface RelatedPostsProps {
  relatedUids: string[];
  widget?: {
    title_h2?: string;
    $?: {
      title_h2?: any;
    };
  };
}

/**
 * RelatedPosts Component
 * 
 * Container component that renders a section of related blog posts.
 * This component displays a title (if provided) and maps through
 * an array of related post UIDs to render individual RelatedPostItem components.
 * 
 * @param relatedUids - Array of UIDs for related blog posts
 * @param widget - Widget configuration object containing title and styling information
 */
const RelatedPosts = ({ relatedUids, widget }: RelatedPostsProps) => {
  return (
    <div className="related-post">
      {/* Render section title if widget configuration is provided */}
      {widget && (
        <h2 {...widget.$?.title_h2}>{widget.title_h2}</h2>
      )}
      
      {/* Map through related post UIDs and render individual post items */}
      {relatedUids.map((uid: string) => (
        <RelatedPostItem key={uid} uid={uid} />
      ))}
    </div>
  );
};

export default RelatedPosts;

