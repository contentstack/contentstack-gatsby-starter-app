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
          {typeof data.section_with_html_code.description === "string"
            ? parser(data.section_with_html_code.description)
            : ""}{" "}
        </div>
        <div className="contact-page-form">
          {typeof data.section_with_html_code.html_code === "string"
            ? parser(data.section_with_html_code.html_code)
            : ""}
        </div>
      </div>
    )
  }
  return (
    <div className="contact-maps-section max-width">
      <div className="maps-details">
        {typeof data.section_with_html_code.html_code === "string" &&
          parser(data.section_with_html_code.html_code)}
      </div>
      <div className="contact-maps-content">
        {data.section_with_html_code.title ? (
          <h2>{data.section_with_html_code.title}</h2>
        ) : (
          ""
        )}
        {typeof data.section_with_html_code.description === "string"
          ? parser(data.section_with_html_code.description)
          : ""}{" "}
      </div>
    </div>
  )
}

export default SectionWithEmbedObject
