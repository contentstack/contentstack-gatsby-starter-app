import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  switch (action.type) {
    case "setHeader":
      return { ...state, header: action.header }
    case "setFooter":
      return { ...state, footer: action.footer }
    case "setPage":
      return { ...state, page: action.page }
    case "setBlogpost":
      return { ...state, blog_post: action.blogpost }
    default:
      return { ...state }
  }
}

const initialState = { header: {}, footer: {}, page: {}, blog_post: {} }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
