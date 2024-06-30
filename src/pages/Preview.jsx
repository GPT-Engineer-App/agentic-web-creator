import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from 'dompurify';
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import PreviewIframe from "../components/PreviewIframe";

const Preview = () => {
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState("");
  const [rating, setRating] = useState(0);

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

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/submit-rating", { rating });
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  useEffect(() => {
    const previewSocket = new WebSocket("ws://your-server/preview");
    previewSocket.onmessage = (event) => {
      const sanitizedHtmlContent = DOMPurify.sanitize(JSON.parse(event.data));
      setHtmlContent(sanitizedHtmlContent);
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
      <form id="feedback-form" onSubmit={handleRatingSubmit}>
        <input type="radio" name="rating" value="1" onChange={handleRatingChange} /> 1
        <input type="radio" name="rating" value="2" onChange={handleRatingChange} /> 2
        <input type="radio" name="rating" value="3" onChange={handleRatingChange} /> 3
        <input type="radio" name="rating" value="4" onChange={handleRatingChange} /> 4
        <input type="radio" name="rating" value="5" onChange={handleRatingChange} /> 5
        <button type="submit">Submit Rating</button>
      </form>
    </div>
  );
};

export default Preview;