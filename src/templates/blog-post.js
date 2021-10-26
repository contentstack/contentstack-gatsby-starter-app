import React from "react"
import { graphql } from "gatsby"
import parser from "html-react-parser"
import moment from "moment"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import FromBlog from "../components/FromBlog"
import HeroBanner from "../components/BlogBanner"
import { connect } from "react-redux"
import { actionPage, actionBlogpost } from "../store/actions/state.action"

const blogPost = props => {
  const {
    data: { contentstackBlogPost, contentstackPage },
    dispatch,
  } = props
  dispatch(actionBlogpost(contentstackBlogPost))
  return (
    <Layout property={props}>
      <SEO title={contentstackBlogPost.title} />
      <HeroBanner />
      <div
        className="blog-container"
        data-pageref={contentstackBlogPost.uid}
        data-contenttype="blog_post"
        data-locale={contentstackBlogPost.locale}
      >
        <div className="blog-detail">
          <h2>
            {contentstackBlogPost.title ? contentstackBlogPost.title : ""}
          </h2>
          <p>
            {moment(contentstackBlogPost.date).format("ddd, MMM D YYYY")},{" "}
            <strong>{contentstackBlogPost.author[0]?.title}</strong>
          </p>
          {parser(contentstackBlogPost.body)}
        </div>
        <div className="blog-column-right">
          <div className="related-post">
            {contentstackPage.page_components?.map((component, index) => {
              if (component.widget && index === 2) {
                return <h2>{component.widget.title_h2}</h2>
              }
            })}
            <FromBlog
              data={
                contentstackBlogPost.related_post
                  ? contentstackBlogPost.related_post
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
  query ($title: String!) {
    contentstackBlogPost(title: { eq: $title }) {
      url
      title
      body
      uid
      locale
      date
      author {
        title
        bio
        picture {
          url
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
export default connect()(blogPost)
