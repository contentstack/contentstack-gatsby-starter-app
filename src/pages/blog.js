import React from "react"
import { Link, graphql } from "gatsby"
import parser from "html-react-parser"
import moment from "moment"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import HeroBanner from "../components/BlogBanner"
import FromBlog from "../components/FromBlog"
import { connect } from "react-redux"
import { actionPage, actionBlogpost } from "../store/actions/state.action"
import * as Utils from "@contentstack/utils"

const Blog = ({
  data: { allContentstackBlogPost, contentstackPage },
  dispatch,
}) => {
  const renderOption = {
    ["span"]: (node, next) => {
      return next(node.children)
    },
  }

  Utils.jsonToHTML({
    entry: allContentstackBlogPost.nodes,
    paths: ["body"],
    renderOption,
  })
  let archived = [],
    blogList = []
  allContentstackBlogPost.nodes.forEach(blogs => {
    if (blogs.is_archived) {
      archived.push(blogs)
    } else {
      blogList.push(blogs)
    }
  })

  dispatch(actionPage(contentstackPage))
  dispatch(actionBlogpost(allContentstackBlogPost.nodes))

  return (
    <Layout>
      <SEO title={contentstackPage.title} />
      <HeroBanner />
      <div
        className="blog-container"
        data-pageref={contentstackPage.uid}
        data-contenttype="page"
        data-locale={contentstackPage.locale}
      >
        <div className="blog-column-left">
          {blogList.map((blog, index) => {
            return (
              <div className="blog-list" key={index}>
                {blog.featured_image && (
                  <Link to={blog.url}>
                    <img
                      alt="blog-img"
                      className="blog-list-img"
                      src={blog.featured_image.url}
                    />
                  </Link>
                )}
                <div className="blog-content">
                  {blog.title && (
                    <Link to={blog.url}>
                      <h3>{blog.title}</h3>
                    </Link>
                  )}
                  <p>
                    {moment(blog.date).format("ddd, MMM D YYYY")},{" "}
                    <strong>{blog.author[0]?.title}</strong>
                  </p>
                  {typeof blog.body === "string"
                    ? parser(blog.body.slice(0, 300))
                    : ""}
                  {blog.url ? (
                    <Link to={blog.url}>
                      <span>{"Read more -->"}</span>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="blog-column-right">
          <h2>{contentstackPage.page_components[1].widget.title_h2}</h2>
          <FromBlog data={archived} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    contentstackPage(title: { eq: "Blog" }) {
      title
      url
      uid
      locale
      seo {
        enable_search_indexing
        keywords
        meta_description
        meta_title
      }
      page_components {
        contact_details {
          address
          email
          phone
        }
        from_blog {
          title_h2
          featured_blogs {
            title
            uid
            url
            is_archived
            featured_image {
              url
            }
            body
            author {
              title
              uid
              bio
            }
          }
          view_articles {
            title
            href
          }
        }
        hero_banner {
          banner_description
          banner_title
          bg_color
          call_to_action {
            title
            href
          }
        }
        our_team {
          title_h2
          description
          employees {
            name
            designation
            image {
              url
            }
          }
        }
        section {
          title_h2
          description
          image {
            url
          }
          image_alignment
          call_to_action {
            title
            href
          }
        }
        section_with_buckets {
          title_h2
          description
          buckets {
            title_h3
            description
            icon {
              url
            }
            call_to_action {
              title
              href
            }
          }
        }
        section_with_cards {
          cards {
            title_h3
            description
            call_to_action {
              title
              href
            }
          }
        }
        widget {
          title_h2
          type
        }
      }
    }

    allContentstackBlogPost {
      nodes {
        url
        title
        uid
        author {
          title
        }
        related_post {
          title
          body
        }
        date
        featured_image {
          url
        }
        is_archived
        body
      }
    }
  }
`

export default connect()(Blog)
