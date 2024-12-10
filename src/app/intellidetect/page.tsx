// src/app/page.js
import Head from "next/head";
import Link from "next/link";
import BackgroundImage from "@/images/background-call-to-action.jpg"
import Image from "next/image";
interface ButtonProps {
  text: string;
  href: string;
}

// Button component
function Button({ text, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center bg-white text-[#3066be] font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
    >
      {text}
    </Link>
  );
}

export default function Home() {
  // Set your custom background image URL here
  const backgroundImage = "url('@/images/background-call-to-action.jpg')"; // Replace with your new image path

  return (
    <>
      <Head>
        <title>IntelliDetect</title>
        <link rel="icon" href="/favicon.ico" /> {/* Ensure your favicon is in public */}
      </Head>
      <div
        className="flex relative flex-col items-center justify-center min-h-screen"
      >
      <Image
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src={BackgroundImage}
        alt="Background"
        layout="fill"
        quality={100}
        style={{ filter: 'blur(20px)' }}
      />
        {/* Header Section */}
        <div className="text-center p-6">
          <h1 className="text-5xl font-bold" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="bg-white py-3 px-6 rounded-full shadow-lg flex justify-center items-center">
              <span className="text-gray-800 font-bold">INTELLI</span>
              <span className="text-blue-800 font-bold">DETECT</span>
            </div>
          </h1>
          {/* Custom Paragraph */}
          <p className="text-white mt-4 max-w-2xl text-lg font-medium">
          IntelliDetect is an innovative tool designed to identify plagiarism in programming codes. By employing sophisticated algorithms such as text similarity analysis, tokenization, and abstract syntax tree (AST) comparisons, it effectively detects copied or modified codes across various languages.
          </p>
        </div>

        {/* Button Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 px-4">
          <Button text="Check AI Plagiarism for C++ Code" href="/cpp" />
          <Button text="Check AI Plagiarism for Python Code" href="/python" />
          <Button text="Check AI Plagiarism for Java Code" href="/java" />
          <Button text="Check AI Plagiarism for JavaScript Code" href="/javascript" />
        </div>
      </div>
    </>
  );
}
