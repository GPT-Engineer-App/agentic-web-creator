import React, { useState } from "react";
import { generateCode, createZipFile } from '../utils/codeGenerator';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Index = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      const response = await axios.post("/api/process-description", { description });
      const parsedData = response.data;
      console.log(parsedData); // For debugging purposes

      const generatedCode = await generateCode(parsedData);
      const zipFile = await createZipFile(generatedCode);

      // Trigger download of the ZIP file
      const blob = new Blob([zipFile], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'webapp.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      navigate("/preview", { state: { parsedData } });
    } catch (error) {
      console.error("Error processing description:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Welcome to Web App Generator</h1>
      <p className="text-center">Describe your web app idea below:</p>
      <Input 
        placeholder="Enter your web app description..." 
        className="w-1/2" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleGenerate}>Generate</Button>
    </div>
  );
};

export default Index;