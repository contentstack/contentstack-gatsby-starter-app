/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 */

import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import DevTools from "./devtools"
import { connect } from "react-redux"

typeof window !== "undefined" && require("bootstrap/dist/css/bootstrap.min.css")
typeof window !== "undefined" && require("bootstrap/dist/js/bootstrap")
require("../styles/style.css")

const mapStateToProps = ({ header, footer, page, blog_post }) => {
  return { header, footer, page, blog_post }
}

const Layout = ({ header, footer, page, blog_post, children }) => {
  const json = { header, footer }
  page && (json.page = page)
  blog_post && (json.blog_post = blog_post)

  return (
    <>
      <Header />
      <DevTools response={json} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default connect(mapStateToProps)(Layout)
