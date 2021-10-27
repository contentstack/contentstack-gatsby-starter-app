import React from "react"
// import ReactJson from "react-json-view";
// const ReactJson =typeof window !== "undefined" && require("react-json-view");


const ReactJson = React.lazy(() =>
  import("react-json-view")
)

const DevTools = ({ response }) => {
  const isSSR = typeof window === "undefined"
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="staticBackdropLabel">
              Json Response
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <pre id="jsonViewer">
              {response && !isSSR && (
                <React.Suspense fallback={<div />}>
                <ReactJson
                  src={response}
                  collapsed={1}
                  name="response"
                  enableClipboard={false}
                />
                </React.Suspense>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DevTools
