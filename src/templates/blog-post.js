import React from "react"
import { graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"
import moment from "moment"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import FromBlog from "../components/FromBlog"
import HeroBanner from "../components/BlogBanner"

export default function blogPost(props) {
  let { data } = props
  return (
    <Layout property={props}>
      <SEO title={data.contentstackBlogPost.title} />
      <HeroBanner />
      <div className="blog-container">
        <div className="blog-detail">
          <h2>
            {data.contentstackBlogPost.title
              ? data.contentstackBlogPost.title
              : ""}
          </h2>
          <p>
            {moment(data.contentstackBlogPost.date).format("ddd, MMM D YYYY")},{" "}
            <strong>{data.contentstackBlogPost.author[0].title}</strong>
          </p>
          {ReactHtmlParser(data.contentstackBlogPost.body)}
        </div>
        <div className="blog-column-right">
          <div className="related-post">
            {data.contentstackPage.page_components?.map((component, index) => {
              if (component.widget && index === 2) {
                return <h2>{component.widget.title_h2}</h2>
              }
            })}
            <FromBlog
              data={
                data.contentstackBlogPost.related_post
                  ? data.contentstackBlogPost.related_post
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const postQuery = graphql`
  query($title: String!) {
    contentstackBlogPost(title: { eq: $title }) {
      url
      title
      body
      date
      author {
        title
        bio
        picture {
          url
          title
        }
      }
      related_post {
        body
        url
        title
        date
      }
      seo {
        enable_search_indexing
        keywords
        meta_description
        meta_title
      }
    }

    contentstackPage {
      page_components {
        widget {
          title_h2
          type
        }
      }
    }
  }
`
