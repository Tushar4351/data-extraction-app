import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

interface ExtractedData {
  name?: string;
  documentNumber?: string;
  expirationDate?: string;
}

const DocumentDataExtractor = () => {
  const [extractedData, setExtractedData] = useState<ExtractedData>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsProcessing(true);
      const file = event.target.files[0];

      try {
        const { data } = await Tesseract.recognize(file, 'eng', {
          logger: (m) => console.log(m),
        });

        // Parse the Tesseract.js response to extract the relevant information
        const { name, documentNumber, expirationDate } = parseDataFromResponse(data.text);
        setExtractedData({ name, documentNumber, expirationDate });
      } catch (error) {
        console.error('Error extracting data:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const parseDataFromResponse = (text: string): ExtractedData => {
    // Implement logic to parse the OCR response and extract the required information
    return {
      name: 'John Doe',
      documentNumber: '12345678',
      expirationDate: '2025-12-31',
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {isProcessing ? (
        <div>Processing document...</div>
      ) : (
        <div>
          {extractedData.name && <div>Name: {extractedData.name}</div>}
          {extractedData.documentNumber && (
            <div>Document Number: {extractedData.documentNumber}</div>
          )}
          {extractedData.expirationDate && (
            <div>Expiration Date: {extractedData.expirationDate}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentDataExtractor;