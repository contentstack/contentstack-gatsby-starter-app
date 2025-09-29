# Related Posts Feature Documentation

## Overview

This document describes the implementation of the Related Posts feature in the Contentstack Gatsby starter application. The feature allows blog posts to display related articles based on content relationships defined in Contentstack CMS.

## Primary Motivation

The main reason behind this implementation is to **optimize Contentstack API requests** by reducing the complexity of `include` query parameters in single Contentstack GET requests. By splitting related posts into separate queries, we avoid long URL errors that can occur when trying to include multiple references in a single API call. This approach allows for:

- **Multiple smaller queries** instead of one complex query
- **Avoiding URL length limitations** in Contentstack API requests
- **Better performance** through targeted data fetching
- **Reduced risk of API timeouts** with complex include parameters

## Architecture

The related posts functionality consists of three main components:

1. **RelatedPosts Component** - Container component that renders the related posts section
2. **RelatedPostItem Component** - Individual related post item with live preview support
3. **Blog Post Template Integration** - Integration into the blog post template

## Components

### RelatedPosts Component (`src/components/RelatedPosts.tsx`)

**Purpose**: Main container component that renders the related posts section.

**Props**:
- `relatedUids`: Array of UIDs for related blog posts
- `widget`: Widget configuration object containing title and styling information

**Features**:
- Renders a section title from the widget configuration
- Maps through related post UIDs and renders individual RelatedPostItem components
- Supports live preview editing through Contentstack's live preview system

### RelatedPostItem Component (`src/components/RelatedPostItem.tsx`)

**Purpose**: Individual related post item component that fetches and displays related post data.

**Props**:
- `uid`: Unique identifier for the related blog post

**Features**:
- **Optimized API Requests**: Fetches individual blog posts separately to avoid complex `include` parameters
- **Dynamic Data Fetching**: Fetches blog post data using Contentstack SDK with minimal include parameters
- **Live Preview Support**: Integrates with Contentstack's live preview system
- **Author References**: Includes only necessary author information in targeted queries
- **Content Processing**: Processes HTML content using `jsonToHTML` utility
- **Loading State**: Shows loading indicator while fetching data
- **Content Preview**: Displays truncated post content (first 80 characters)
- **Navigation**: Links to the full blog post using Gatsby's Link component

**Data Flow**:
1. Component receives a UID prop
2. Makes a focused API request to Contentstack using the UID (avoiding complex include parameters)
3. Processes the content for display
4. Renders the post title and truncated body
5. Provides navigation link to the full post

**API Optimization Benefits**:
- **Shorter URLs**: Each request has minimal include parameters
- **Faster Response**: Targeted queries return data more quickly
- **Reduced Complexity**: Avoids nested reference includes that can cause URL length issues
- **Better Error Handling**: Individual requests can be retried independently

### Blog Post Template Integration (`src/templates/blog-post.tsx`)

**Integration Points**:
- **GraphQL Query**: Extended to include `related_post` field with UIDs
- **Component Rendering**: Added RelatedPosts component to the blog post layout
- **Data Mapping**: Maps related post UIDs from the blog post data
- **Widget Configuration**: Passes widget configuration for styling and titles

## Data Structure

### GraphQL Schema Extension

The blog post query has been extended to include related posts:

```graphql
related_post {
  uid
}
```

### Contentstack Content Model

The feature expects the following content model structure in Contentstack:

- **Blog Post Content Type**: Should include a `related_post` field
- **Widget Content Type**: Should include `title_h2` field for section titles
- **Author References**: Related posts should have author references for proper display

## Implementation Details

### API Request Optimization Strategy

The implementation uses a **split-query approach** to optimize Contentstack API performance:

### Live Preview Integration

All components support Contentstack's live preview functionality:

- **Real-time Updates**: Changes in Contentstack are reflected immediately
- **Editable Tags**: Content can be edited directly in the preview
- **Event Handling**: Proper cleanup of event listeners to prevent memory leaks

### Performance Considerations

- **Split Query Strategy**: Related posts are fetched individually to avoid complex include parameters
- **URL Length Optimization**: Each request has minimal parameters to avoid URL length errors
- **Error Handling**: Graceful handling of missing or invalid UIDs with individual request retry capability
- **Memory Management**: Proper cleanup of event listeners and state
- **Reduced API Complexity**: Simpler queries are more reliable and faster


## File Structure

```
src/
├── components/
│   ├── RelatedPosts.tsx          # Main related posts container
│   └── RelatedPostItem.tsx       # Individual related post item
└── templates/
    └── blog-post.tsx             # Blog post template with integration
```

