import React from "react"
import moment from "moment"
import parse from "html-react-parser"
import { Link } from "gatsby"

function BlogList({ blogList }) {
  let body = typeof blogList.body === "string" && blogList.body.substr(0, 300)
  const stringLength = body.lastIndexOf(" ")
  body = `${body.substr(0, Math.min(body.length, stringLength))}...`
  return (
    <div className="blog-list">
      {blogList.featured_image && (
        <Link to={blogList.url}>
          <img
            className="blog-list-img"
            src={blogList.featured_image.url}
            alt="blog img"
            {...blogList.featured_image.$?.url}
          />
        </Link>
      )}
      <div className="blog-content">
        {blogList.title && (
          <Link to={blogList.url}>
            <h3 {...blogList.$?.title}>{blogList.title}</h3>
          </Link>
        )}
        <p>
          <strong {...blogList.$?.date}>
            {moment(blogList.date).format("ddd, MMM D YYYY")}
          </strong>
          ,{" "}
          <strong {...blogList.author[0]?.$?.title}>
            {blogList.author[0]?.title}
          </strong>
        </p>
        <div {...blogList.$?.body}>{parse(body)}</div>
        {blogList.url ? (
          <Link to={blogList.url}>
            <span>{"Read more -->"}</span>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default BlogList
