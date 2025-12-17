import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import parse from "html-react-parser";
import { connect } from "react-redux";
import Tooltip from "./ToolTip";
import jsonIcon from "../images/json.svg";
import { addEditableTags, isLiveEditTagsEnabled } from "../helper/index";
import { getCSData } from "../live-preview-sdk";
import { actionHeader } from "../store/actions/state.action";
import { DispatchData, Menu } from "../typescript/layout";
import { HeaderModel } from "../common/types";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { ContentstackGatsby } from "gatsby-source-contentstack/live-preview";

const queryHeader = () => {
  const query = graphql`
    query {
      contentstackHeader {
        cslp__meta
        title
        uid
        logo {
          uid
          url
          filename
        }
        navigation_menu {
          label
          page_reference {
            ... on Contentstack_page {
              title
              pageUrl: url
              uid
            }
            ... on Contentstack_blog_post {
              title
              blogUrl: url
              uid
            }
            ... on Contentstack_superhero_landing_page {
              title
              superheroLandingUrl: url
              uid
            }
            ... on Contentstack_superhero_gallery_page {
              title
              superheroGalleryUrl: url
              uid
            }
            ... on Contentstack_home_world {
              title
              homeWorldUrl: url
              uid
            }
            ... on Contentstack_character {
              title
              characterUrl: url
              uid
            }
          }
        }
        notification_bar {
          show_announcement
          announcement_text
        }
      }
    }
  `;
  return useStaticQuery(query);
};

const getPageUrl = (ref: any) => {
  return ref?.pageUrl || ref?.blogUrl || ref?.superheroLandingUrl || 
         ref?.superheroGalleryUrl || ref?.homeWorldUrl || ref?.characterUrl || ref?.url;
};

const Header = ({ dispatch }: DispatchData) => {
  const { contentstackHeader } = queryHeader();
  ContentstackGatsby.addContentTypeUidFromTypename(contentstackHeader);
  isLiveEditTagsEnabled && addEditableTags(contentstackHeader, "header");
  const [getHeader, setHeader] = useState(contentstackHeader);

  async function getHeaderData() {
    const headerRes: HeaderModel = await getCSData.get(contentstackHeader);
    isLiveEditTagsEnabled && addEditableTags(headerRes, "header");
    setHeader(headerRes);
  }

  useEffect(() => {
    const callbackId = ContentstackLivePreview.onLiveEdit(getHeaderData);
    return () => ContentstackLivePreview.unsubscribeOnEntryChange(callbackId);
  }, []);

  useEffect(() => {
    dispatch(actionHeader(getHeader));
  }, [getHeader]);

  return (
    <header className="header">
      <div
        className="note-div"
        {...getHeader.notification_bar.$?.announcement_text}
      >
        {getHeader.notification_bar.show_announcement &&
          typeof getHeader.notification_bar.announcement_text === "string" &&
          parse(getHeader.notification_bar.announcement_text)}
      </div>
      <div className="max-width header-div">
        <div className="wrapper-logo">
          <Link to="/" className="logo-tag" title="Contentstack">
            <img
              className="logo"
              {...getHeader.logo.$?.url}
              src={getHeader.logo?.url}
              alt={getHeader.title}
              title={getHeader.title}
            />
          </Link>
        </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>

        <nav className="menu">
          <ul className="nav-ul header-ul">
            {getHeader.navigation_menu.map((menu: Menu, index: number) => {
              return (
                <li className="nav-li" key={index} {...menu.$?.label}>
                  {menu.label === "Home" ? (
                    <Link
                      to={`${getPageUrl(menu.page_reference[0])}`}
                      activeClassName="active"
                    >
                      {menu.label}
                    </Link>
                  ) : (
                    <Link
                      to={`${getPageUrl(menu.page_reference[0])}`}
                      activeClassName="active"
                    >
                      {menu.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="json-preview">
          <Tooltip
            content="JSON Preview"
            direction="top"
            dynamic={false}
            delay={200}
            status={0}
          >
            <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <img src={jsonIcon} alt="JSON Preview icon" />
            </span>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default connect()(Header);
