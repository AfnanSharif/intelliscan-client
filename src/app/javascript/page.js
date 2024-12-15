"use client"; // This line marks the component as a Client Component

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './JsPage.module.css'; // Adjust the import as necessary
import BackgroundImage from "@/images/background-call-to-action.jpg";

export default function JsPage() {
  const [file, setFile] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState(''); // State for storing the filename
  const [pdfUrl, setPdfUrl] = useState(null); // State for storing the PDF URL

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : ''); // Set the filename
  };

  const handleSnippetChange = (e) => {
    setCodeSnippet(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }
    if (codeSnippet) {
      formData.append('code_snippet', codeSnippet);
    }

    setIsLoading(true); // Set loading to true when submission starts
    setPdfUrl(null); // Reset PDF URL

    try {
      const res = await fetch('http://139.59.11.29:8001/analyze/', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.text();
      setResponse(data);

      // Extract the filename from the response and generate the PDF URL
      const match = data.match(/\/download\/(.*?)"/);
      if (match && match[1]) {
        const extractedFileName = match[1];
        setFileName(extractedFileName);
        setPdfUrl(`http://139.59.11.29:8001/download/${extractedFileName}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading to false when done
    }
  };

  const handleDownload = async () => {
    if (!pdfUrl) return;

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Failed to download report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName.split('.')[0]}_report_intelliscan.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div className='relative'>
      <Image
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src={BackgroundImage}
        alt="Background"
        layout="fill"
        quality={100}
        style={{ filter: "blur(20px)" }}
      />
      <Head>
        <title>Check JavaScript Plagiarism</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
        <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: "Arial, sans-serif" }}>
          <div className="bg-white py-3 px-6 rounded-full shadow-lg flex justify-center items-center">
            <span className="text-gray-800 font-bold">Check JavaScript</span>
            <span className="text-blue-800 font-bold">Plagiarism</span>
          </div>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
          <label htmlFor="file-upload" className={styles.label}>
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".js, .png, .jpg, .jpeg, .gif, .pdf, .docx, .txt"
            onChange={handleFileChange}
            className={styles.hiddenFileInput} // Use the new class here
          />
          {fileName && <div className="text-gray-700">Selected File: {fileName}</div>}
          <textarea
            value={codeSnippet}
            onChange={handleSnippetChange}
            placeholder="Paste your JavaScript code snippet here..."
            className={styles.textarea}
          />
          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-[#3c3744] transition duration-300"
          >
            Submit
          </button>
        </form>
        {isLoading && (
          <div className={styles.analyzing}>
            <div>Analyzing Please Wait</div>
            <div className={styles.analyzingContainer}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </div>
        )}
        {response && (
          <div className={styles.responseContainer}>
            <div dangerouslySetInnerHTML={{ __html: response }} />
            {pdfUrl && (
              <button 
                onClick={handleDownload} 
                className="mt-4 bg-[#3066be] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#3c3744] transition duration-300"
              >
                Download Report
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
