import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import Joi from 'joi';

const schema = Joi.object({
  description: Joi.string().min(10).max(1000).required(),
  template: Joi.string().valid('basic', 'ecommerce', 'blog').required()
});

const Index = () => {
  const { t } = useTranslation();
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
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4 bg-cover bg-center p-4" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <h1 className="text-4xl font-bold text-white text-center">{t('welcome')}</h1>
      <p className="text-lg text-white text-center">{t('description')}</p>
      <Input 
        placeholder="Enter your web app description..." 
        className="w-full max-w-md p-2 rounded-lg" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleGenerate} className="bg-blue-500 text-white p-2 rounded-lg">{t('generate')}</Button>
    </div>
  );
};

export default Index;