import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import parse from "html-react-parser"
import { connect } from "react-redux"
import { actionHeader } from "../store/actions/state.action"
import DevtoolsIcon from "../images/devtools.gif"

const queryHeader = () => {
  const query = graphql`
    query {
      contentstackHeader {
        title
        uid
        logo {
          url
        }
        navigation_menu {
          label
          page_reference {
            title
            url
          }
        }
        notification_bar {
          show_announcement
          announcement_text
        }
      }
    }
  `
  return useStaticQuery(query)
}
const Header = ({ dispatch }) => {
  const { contentstackHeader } = queryHeader()
  dispatch(actionHeader(contentstackHeader))
  return (
    <header className="header">
      <div className="note-div">
        {contentstackHeader.notification_bar.show_announcement ? (
          parse(contentstackHeader.notification_bar.announcement_text)
        ) : (
          <div style={{ visibility: "hidden" }}>Dev tools section</div>
        )}
        <span
          className="devtools"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <img src={DevtoolsIcon} alt="dev tools icon" title="json preview"/>
          {/* <i className="fas fa-tools fa-lg" /> */}
        </span>
      </div>
      <div className="max-width header-div">
        <div className="wrapper-logo">
          <Link to="/" className="logo-tag" title="Contentstack">
            <img
              className="logo"
              src={contentstackHeader.logo.url}
              alt={contentstackHeader.title}
              title={contentstackHeader.title}
            />
          </Link>
        </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>

        <nav className="menu">
          <ul className="nav-ul header-ul">
            {contentstackHeader.navigation_menu.map((menu, index) => {
              return (
                <li className="nav-li" key={index}>
                  {menu.label === "Home" ? (
                    <Link
                      to={`${menu.page_reference[0].url}`}
                      activeClassName="active"
                    >
                      {menu.label}
                    </Link>
                  ) : (
                    <Link
                      to={`${menu.page_reference[0].url}/`}
                      activeClassName="active"
                    >
                      {menu.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default connect()(Header)
