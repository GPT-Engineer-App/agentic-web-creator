import React, { useEffect, useRef } from "react";

const PreviewIframe = ({ htmlContent }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow.postMessage(htmlContent, "*");
    }
  }, [htmlContent]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      sandbox="allow-scripts allow-same-origin"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
};

export default PreviewIframe;