import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    // Placeholder for the code export logic
    alert("Codebase downloaded!");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Interactive Preview</h1>
      <p className="text-center">Here is a preview of your generated web app:</p>
      <div className="w-3/4 h-3/4 bg-gray-100 border rounded-lg p-4">
        {/* Placeholder for the interactive preview */}
        <p>Your web app preview will appear here.</p>
      </div>
      <Button onClick={handleDownload}>Download Codebase</Button>
    </div>
  );
};

export default Preview;