import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleGenerate = () => {
    // Placeholder for the code generation logic
    navigate("/preview");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Welcome to Web App Generator</h1>
      <p className="text-center">Describe your web app idea below:</p>
      <Input placeholder="Enter your web app description..." className="w-1/2" />
      <Button onClick={handleGenerate}>Generate</Button>
    </div>
  );
};

export default Index;