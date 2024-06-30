import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import DOMPurify from 'dompurify';
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import PreviewIframe from "../components/PreviewIframe";

const Preview = () => {
  const { t } = useTranslation();
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
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4 bg-cover bg-center p-4" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <h1 className="text-4xl font-bold text-white text-center">{t('interactivePreview')}</h1>
      <p className="text-lg text-white text-center">{t('previewDescription')}</p>
      <div className="w-3/4 h-3/4 bg-gray-100 border rounded-lg p-4">
        <PreviewIframe htmlContent={htmlContent} />
      </div>
      <Button onClick={handleDownload} className="bg-blue-500 text-white p-2 rounded-lg">{t('download')}</Button>
      <form id="feedback-form" onSubmit={handleRatingSubmit} className="flex flex-col items-center space-y-2">
        <div className="flex space-x-2">
          <input type="radio" name="rating" value="1" onChange={handleRatingChange} /> 1
          <input type="radio" name="rating" value="2" onChange={handleRatingChange} /> 2
          <input type="radio" name="rating" value="3" onChange={handleRatingChange} /> 3
          <input type="radio" name="rating" value="4" onChange={handleRatingChange} /> 4
          <input type="radio" name="rating" value="5" onChange={handleRatingChange} /> 5
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">{t('rating')}</button>
      </form>
    </div>
  );
};

export default Preview;