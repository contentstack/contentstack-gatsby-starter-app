import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { connect } from "react-redux"
import DevTools from "./devtools"

const queryBlogBanner = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      contentstackPage(title: { eq: "Blog" }) {
        title
        page_components {
          hero_banner {
            banner_description
            banner_title
          }
        }
      }
    }
  `)
  return data
}
const mapStateToProps = ({ header, footer, page, blog_post }) => {
  return { header, footer, page, blog_post }
}

const blogHero = ({ header, footer, page, blog_post }) => {
  let data = queryBlogBanner()
  const json = { header, footer }
  page && (json.page = page)
  blog_post && (json.blog_post = blog_post)
  return (
    <>
      <DevTools response={json} />
      <div className="blog-page-banner">
        <div className="blog-page-content">
          {data.contentstackPage.page_components[0].hero_banner.banner_title ? (
            <h1 className="hero-title">
              {
                data.contentstackPage.page_components[0].hero_banner
                  .banner_title
              }
            </h1>
          ) : (
            ""
          )}

          {data.contentstackPage.page_components[0].hero_banner
            .banner_description ? (
            <p className="hero-description">
              {
                data.contentstackPage.page_components[0].hero_banner
                  .banner_description
              }
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}

export default connect(mapStateToProps)(blogHero)
