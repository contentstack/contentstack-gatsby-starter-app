// Declaration file for gatsby-source-contentstack
declare module 'gatsby-source-contentstack/live-preview' {
  export const ContentstackGatsby: {
    addContentTypeUidFromTypename: (entry: any) => void;
    get: (entry: any) => Promise<any>;
    // Add other methods used by ContentstackGatsby as needed
  };
}