import { useRef } from 'react';

export default function FileInput({ onChange }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the input click
  };

  return (
    <label className="flex justify-center items-center block mb-4 cursor-pointer">
      <input
        type="file"
        multiple
        onChange={onChange}
        className="hidden" // Hide the default input
        accept=".js,.py,.java,.c,.cpp,.html,.css,.rb,.php,.swift,.go,.rs,.ts,.json,.xml,.sql,.pl,.sh,.bash,.scala,.kt,.lua,.dart,.r,.groovy,.perl,.vb,.pas,.ml,.h,.m,.clj,.f90,.d,.obj,.asm,.j,.nasm,.s,.coffee,.elixir,.julia,.xql,.tcl,.cr,.awk,.raku,.sol,.yaml,.toml"

        ref={fileInputRef} // Attach the ref here
      />
      <button
        onClick={handleButtonClick} // Call the click handler
        className="mt-4 bg-black text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-[#3c3744] transition duration-300 w-full min-w-[400px]"
      >
        Choose File(s)
      </button>
    </label>
  );
}