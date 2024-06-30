import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Joi from 'joi';

const schema = Joi.object({
  description: Joi.string().min(10).max(1000).required(),
  template: Joi.string().valid('basic', 'ecommerce', 'blog').required()
});

const Index = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      const { error, value } = schema.validate({ description, template: 'basic' });
      if (error) {
        console.error("Validation error:", error.details[0].message);
        return;
      }

      const response = await axios.post("/api/process-description", { description });
      const parsedData = response.data;
      console.log(parsedData); // For debugging purposes
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