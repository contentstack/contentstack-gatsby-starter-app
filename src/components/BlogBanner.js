import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { connect } from "react-redux"
import { actionPage } from "../store/actions/state.action"

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

const blogHero = ({dispatch}) => {
  let data = queryBlogBanner()
  dispatch(actionPage(data.contentstackPage.page_components))
  return (
    <>
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

export default connect()(blogHero)
