import { Link } from "gatsby"
import React from "react"
import parser from "html-react-parser"

const ArchiveRelative = ({ data }) => {
  return data.map((index, key) => {
    return (
      <Link to={index.url} key={key}>
        <div>
          <h4 {...index.$?.title}>{index.title}</h4>
          {typeof index.body === "string" && (
            <div {...index.$?.body}> {parser(index.body.slice(0, 80))}</div>
          )}
        </div>
      </Link>
    )
  })
}

export default ArchiveRelative
