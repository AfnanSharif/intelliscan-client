"use client";

import { useState } from 'react';
import FileInput from '../../components/FileInput';
import BackgroundImage from '@/images/background-features.jpg';
import Image from 'next/image';
const BouncingDots = () => (
  <div className="flex justify-center space-x-2">
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
  </div>
);

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportUrl, setReportUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
  };

  const handleFileClick = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setSelectedFile(e.target.result);
    reader.readAsText(file);
  };

  const closePopup = () => {
    setSelectedFile(null);
  };

  const handleCheckPlagiarism = async () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    setLoading(true); // Start loading

    try {
      const intellicheckApiUrl = "http://139.59.11.29:5000"; // Accessing environment variable
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
      link.parentNode.removeChild(link); // Clean up the DOM
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAnalyzeOtherFiles = () => {
    setFiles([]);
    setReportUrl(null); // Clear the report URL
  };
  const backgroundImage = "url('/background-call-to-action.jpg')"; // Update the path


  return (
    <div 
      className="min-h-screen relative" 
      // style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}

    >
      <Image
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src={BackgroundImage}
        alt="Background"
        layout="fill"
        quality={100}
        style={{ filter: "blur(20px)" }}
      />
      {/* <Header /> */}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 gap-1">
      <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="bg-white py-3 px-6 rounded-full shadow-lg flex justify-center items-center">
              <span className="text-gray-800 font-bold">INTELLI</span>
              <span className="text-blue-800 font-bold">CHECK</span>
            </div>
          </h1>
          <p className="text-white mt-4 max-w-2xl text-lg font-medium text-center">
          IntelliCheck is an advanced tool designed to ensure the integrity of student code submissions. It intelligently analyzes and compares code assignments from multiple students to detect similarities and potential plagiarism. By leveraging cutting-edge machine learning and natural language processing techniques, it provides a detailed analysis of code structure, logic, and content.


          </p>
      <div className="p-6 bg-opacity-80 rounded-lg"> {/* Optional: Add a semi-transparent background for readability */}
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
        </div>

        {/* Check Plagiarism Button appears only if files are selected */}
        {files.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCheckPlagiarism}
              className="p-4 border rounded bg-gray-100 cursor-pointer hover:bg-gray-200 text-lg"
            >
              Check Plagiarism
            </button>
          </div>
        )}

        {/* Show loading indicator when processing */}
        {loading && (
          <div className="flex justify-center mt-4">
            <BouncingDots />
          </div>
        )}
      </div>

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

      {/* Display the report if it exists */}
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
