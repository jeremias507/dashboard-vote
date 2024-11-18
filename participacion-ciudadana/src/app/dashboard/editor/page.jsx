"use client";

import React, { useState, useEffect } from "react";
import Editor from "@/components/editor/Editor";

export default function EditorPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("outputData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div>
      <Editor content={data} />
    </div>
  );
}