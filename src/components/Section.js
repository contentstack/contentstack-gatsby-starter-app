import { Link } from "gatsby"
import React from "react"

const Section = ({ data }) => {
  function contentSection(data, index) {
    return (
      <div className="home-content" key={index}>
        {data.section.title_h2 && <h2>{data.section.title_h2}</h2>}
        {data.section.description && <p>{data.section.description}</p>}
        {data.section.call_to_action.title &&
        data.section.call_to_action.href ? (
          <Link
            to={data.section.call_to_action.href}
            className="btn secondary-btn"
          >
            {data.section.call_to_action.title}
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  }

  function imageContent(data, index) {
    return (
      <img src={data.section.image.url} alt="section-image" key={index} />
    )
  }

  return (
    <div className="home-advisor-section">
      {data.section.image_alignment === "Left"
        ? [imageContent(data,"left-1"), contentSection(data,"left-2")]
        : [contentSection(data,"right-1"), imageContent(data,"right-2")]}
    </div>
  )
}

export default Section
