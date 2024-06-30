import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import PreviewIframe from "../components/PreviewIframe";

const Preview = () => {
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState("");

  const handleDownload = async () => {
    try {
      const response = await axios.get("/download", { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'webapp.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading codebase:", error);
    }
  };

  useEffect(() => {
    const previewSocket = new WebSocket("ws://your-server/preview");
    previewSocket.onmessage = (event) => {
      setHtmlContent(JSON.parse(event.data));
    };

    return () => {
      previewSocket.close();
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Interactive Preview</h1>
      <p className="text-center">Here is a preview of your generated web app:</p>
      <div className="w-3/4 h-3/4 bg-gray-100 border rounded-lg p-4">
        <PreviewIframe htmlContent={htmlContent} />
      </div>
      <Button onClick={handleDownload}>Download Codebase</Button>
    </div>
  );
};

export default Preview;