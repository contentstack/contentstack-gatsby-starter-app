import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import parser from "html-react-parser"
import { connect } from "react-redux"
import { actionFooter } from "../store/actions/state.action"
import * as Utils from "@contentstack/utils"

const queryLayout = () => {
  const data = useStaticQuery(graphql`
    query {
      contentstackFooter {
        title
        uid
        logo {
          url
        }
        navigation {
          link {
            href
            title
          }
        }
        social {
          social_share {
            link {
              href
              title
            }
            icon {
              url
            }
          }
        }
        copyright
      }
    }
  `)
  return data
}

const Footer = ({ dispatch }) => {
  const { contentstackFooter } = queryLayout()
  dispatch(actionFooter(contentstackFooter))
  const renderOption = {
    ["span"]: (node, next) => {
      return next(node.children)
    },
  }
  Utils.jsonToHTML({
    entry: contentstackFooter,
    paths: ["copyright"],
    renderOption,
  })
  return (
    <footer>
      <div className="max-width footer-div">
        <div className="col-quarter">
          <Link to="/" className="logo-tag">
            <img
              src={contentstackFooter.logo.url}
              alt={contentstackFooter.title}
              title={contentstackFooter.title}
              className="logo footer-logo"
            />
          </Link>
        </div>
        <div className="col-half">
          <nav>
            <ul className="nav-ul">
              {contentstackFooter.navigation.link.map((menu, index) => {
                return (
                  <li className="footer-nav-li" key={index}>
                    <Link to={menu.href}>{menu.title}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="col-quarter social-link">
          <div className="social-nav">
            {contentstackFooter.social.social_share.map((social, index) => {
              return (
                <a
                  href={social.link.href}
                  title={social.link.title.toLowerCase()}
                  key={index}
                  className="footer-social-links"
                >
                  <img src={social.icon.url} alt="social-icon" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className="copyright">
        {typeof contentstackFooter.copyright === "string"
          ? parser(contentstackFooter.copyright)
          : ""}
      </div>
    </footer>
  )
}

export default connect()(Footer)
