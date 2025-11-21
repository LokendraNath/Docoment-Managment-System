import { useState } from "react";

const FileActions = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handlePreview = () => {
    if (file.type === "application/pdf" || file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      window.open(url, "_blank"); // New tab mein preview
    } else {
      alert("Preview not supported for this file type");
    }
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handlePreview}
        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
      >
        Preview
      </button>
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
      >
        Download
      </button>
    </div>
  );
};

export default FileActions;
