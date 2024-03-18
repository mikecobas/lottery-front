"use client";
import { useState } from "react";

const useImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadImage = async (url: any, imageFile: any, method = "POST") => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await fetch(url, {
        method: method,
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Error");
      }

      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, uploadImage };
};

export default useImageUploader;
