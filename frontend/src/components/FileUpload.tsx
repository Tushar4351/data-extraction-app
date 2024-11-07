import React, { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import ProcessingLoader from "./ProcessingLoader";
import ExtractedData from "./ExtractedData";
import { createWorker } from "tesseract.js";

interface ExtractedDataType {
  fileName: string;
  name?: string;
  documentNumber?: string;
  expirationDate?: string;
}

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedDataType | null>(
    null
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl);

    try {
      const worker = await createWorker("eng");
      const ret = await worker.recognize(imgUrl);
    //  console.log(ret.data.text);

    
      const extractedText = ret.data.text.trim();
      const name = extractedText.match(/NAME\s+(\w+\s\w+)/)?.[1];
      const documentNumber = extractedText.match(/D:\s*(\d+)/)?.[1];
      const expirationDate = extractedText.match(
        /EXP:\s*(\d{2}\/\d{2}\/\d{4})/
      )?.[1];
     

      setExtractedData({
        fileName: file.name,
        name,
        documentNumber,
        expirationDate,
      });
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setIsProcessing(false);
      URL.revokeObjectURL(imgUrl);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setExtractedData(null);
  };

  if (isProcessing) {
    return <ProcessingLoader />;
  }

  if (extractedData) {
    return <ExtractedData data={extractedData} onReset={handleReset} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          isDragging
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-600 hover:border-blue-500 bg-gray-800/50"
        }`}
      >
        <input
          type="file"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.png,.jpg,.jpeg"
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <Upload
            className={`w-16 h-16 ${
              isDragging ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <p className="text-xl font-medium text-gray-300">
            Drag & drop files here or click to browse
          </p>
          <p className="text-sm text-gray-400">
            Support for PDF documents and images
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
