import { useState } from "react";
import Cancel from "~/assets/icons/cancel.svg?react";

interface ChristmasPopupProps {
  message: string;
}

export default function ChristmasPopup({ message }: ChristmasPopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  const newYear = new Date().getFullYear() + 1;

  message = message.replace("{newYear}", newYear.toString());

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-300">
      <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-in zoom-in-95 duration-300">
        {/* Simple Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Close Popup"
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <Cancel className="w-5 h-5 cursor-pointer" />
        </button>

        <div className="text-5xl mb-4 select-none">🎄</div>

        <p className="text-gray-800 leading-relaxed font-medium text-lg">
          {message}
        </p>

        <div className="mt-5 flex justify-center gap-2 text-lg text-gray-500">
          <span>✨</span>
          <span>❄️</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
}
