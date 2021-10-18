import React from "react"
import parser from "html-react-parser"

const SectionWithEmbedObject = ({ data }) => {
  if (data.section_with_html_code.html_code_alignment === "Left") {
    return (
      <div className="contact-page-section max-width">
        <div className="contact-page-content">
          {data.section_with_html_code.title ? (
            <h1>{data.section_with_html_code.title}</h1>
          ) : (
            ""
          )}
          {data.section_with_html_code.description
            ? parser(data.section_with_html_code.description)
            : ""}{" "}
        </div>
        <div className="contact-page-form">
          {data.section_with_html_code.html_code ? (
            <>{parser(data.section_with_html_code.html_code)}</>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="contact-maps-section max-width">
      <div className="maps-details">
        {parser(data.section_with_html_code.html_code)}
      </div>
      <div className="contact-maps-content">
        {data.section_with_html_code.title ? (
          <h2>{data.section_with_html_code.title}</h2>
        ) : (
          ""
        )}
        {data.section_with_html_code.description
          ? parser(data.section_with_html_code.description)
          : ""}{" "}
      </div>
    </div>
  )
}

export default SectionWithEmbedObject
