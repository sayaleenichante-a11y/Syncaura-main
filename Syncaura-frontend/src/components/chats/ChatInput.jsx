import EmojiPicker from "emoji-picker-react";
import {  Paperclip, Send, Smile } from "lucide-react";
import { useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";

export default function ChatInput() {
  const [text, setText]=useState("")
  const fileRef=useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleFileOpen = () => {
    fileRef.current.click();
  };

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    if (file) confirm(file.name);
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };
  return (
    <div className=" flex items-center gap-3 px-4 relative bottom-2 left-0 ">
      {showEmoji && (
        <div className="absolute bottom-16 left-4 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme="auto"
          />
        </div>
      )}

      <div className="bg-[#FFFFFF] dark:bg-[#000000] grid grid-cols-20 border border-[#989696] dark:border-[#535353] rounded-2xl px-3 py-2 w-full" >
         <div
          className="flex items-center justify-center col-span-1 cursor-pointer"
         
        >
          <Smile className="size-6 text-gray-500 dark:text-gray-400"  onClick={() => setShowEmoji((prev) => !prev)} />
        </div>
        <div className="flex items-center justify-center col-span-18">
          <input
            value={text}
            onClick={() => setShowEmoji(false)}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message"
            className="w-full text-[#656464] placeholder:text-[#656464] dark:text-gray-200 dark:placeholder:text-gray-200 rounded-full px-4 py-2 outline-none text-sm bg-transparent"
          />
        </div>

        <input type="file" className="hidden" ref={fileRef} onChange={handleFile} />

        <div className="flex items-center justify-center col-span-1"    >
          <Paperclip className="size-6 text-gray-500 dark:text-gray-400" onClick={handleFileOpen} />
        </div>
      </div>
      <button className="bg-blue-600 dark:bg-[#73FBFD] p-3 md:p-4 rounded-full ">
        <FaMicrophone className="size-5 md:size-6 dark:fill-black fill-white " />
      </button>

     
    </div>
  );
}
