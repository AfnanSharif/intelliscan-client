'use client';

import Image from 'next/image';
import { useState } from 'react';
import FileInput from '@/components/FileInput';
import backgroundImage from '@/images/background-features.jpg';
import { CloudCog } from 'lucide-react';

const BouncingDots: React.FC = () => (
  <div className="flex justify-center space-x-2">
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
  </div>
);

export default function Intellicheck() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles(uploadedFiles);
  };

  const handleFileClick = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setSelectedFile(e.target?.result as string);
    reader.readAsText(file);
  };

  const closePopup = () => {
    setSelectedFile(null);
  };

  const handleCheckPlagiarism = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    setLoading(true); // Start loading

    try {
      const intellicheckApiUrl = "http://localhost:8006/"; // Accessing environment variable
      if (!intellicheckApiUrl) {
        throw new Error('Intellicheck API URL is not defined in environment variables.');
      }

      const response = await fetch(`${intellicheckApiUrl}/upload/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const reportFile = await response.blob();
      const reportUrl = URL.createObjectURL(reportFile);
      setReportUrl(reportUrl);

      // Automatically download the report
      const link = document.createElement('a');
      link.href = reportUrl;
      link.setAttribute('download', 'report.html');
      document.body.appendChild(link);
      link.click();

      // Clean up the DOM
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally { 
      setLoading(false); // End loading
    }
  };

  const handleAnalyzeOtherFiles = () => {
    setFiles([]);
    setReportUrl(null); // Clear the report URL
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden p-5 text-center bg-white">
      {/* Background Image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src={backgroundImage}
        alt="Background"
        layout="fill"
        quality={100}
        style={{ filter: 'blur(20px)' }}
      />
      <div className="p-6">
        <FileInput onChange={handleFileChange} />
        <div className="grid grid-cols-1 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="p-4 border rounded bg-gray-100 cursor-pointer hover:bg-gray-200 text-lg"
              onClick={() => handleFileClick(file)}
            >
              {file.name}
            </div>
          ))}
        </div>

        {/* Check Plagiarism Button */}
        {files.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCheckPlagiarism}
              className="bg-[#3066be] text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-[#3c3744] transition duration-300 w-64 text-xl"
            >
              Check Plagiarism
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center mt-4">
            <BouncingDots />
          </div>
        )}
      </div>

      {/* File Preview Popup */}
      {selectedFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-2/3">
            <h2 className="text-2xl font-bold mb-4">File Content</h2>
            <pre className="whitespace-pre-wrap border p-4 overflow-auto text-lg" style={{ maxHeight: '400px' }}>
              {selectedFile}
            </pre>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-800 text-white px-4 py-2 rounded text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Report Display Popup */}
      {reportUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 h-4/5">
            <h2 className="text-2xl font-bold mb-4">Plagiarism Report</h2>
            <iframe src={reportUrl} className="w-full h-full" title="Report" style={{ border: 'none' }}></iframe>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleAnalyzeOtherFiles}
                className="bg-blue-800 text-white px-4 py-2 rounded text-lg"
              >
                Analyze Other Files
              </button>
              <button
                onClick={() => setReportUrl(null)}
                className="bg-blue-800 text-white px-4 py-2 rounded text-lg"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
