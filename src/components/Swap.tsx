"use client";

import { Bot } from "lucide-react"; // Removed Eye as it is no longer needed
import { useRouter } from "next/navigation";

const Swap = () => {
  const router = useRouter();

  // Function to navigate to the chat page
  function navigateToChat() {
    router.push("/");
  }

  return (
    <div>
      <button
        className="btn-sm btn btn-circle btn-outline backdrop-blur bg-gray-800/10 rounded-3xl shadow-md shadow-slate-800"
        onClick={navigateToChat}
        aria-label="Navigate to Chat"
      >
        <Bot />
      </button>
    </div>
  );
};

export default Swap;
