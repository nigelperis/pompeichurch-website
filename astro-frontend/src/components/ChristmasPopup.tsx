import { useState, useEffect } from "react";
import Cancel from "~/assets/icons/cancel.svg?react";

interface ChristmasPopupProps {
  title: string;
  message: string;
}

export default function ChristmasPopup({
  title,
  message,
}: ChristmasPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 16000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-w-md w-full bg-gradient-to-br from-red-700 via-red-600 to-green-700 rounded-2xl p-1 shadow-2xl animate-fade-in">
        <div className="bg-white rounded-xl p-6 text-center relative overflow-hidden">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors cursor-pointer"
            aria-label="Close"
          >
            {" "}
            <Cancel className="h-5 w-5" />
          </button>

          <div className="text-6xl mb-4 mt-2">🎄</div>

          <h2 className="text-2xl font-bold text-red-700 mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{message}</p>

          <div className="absolute bottom-2 left-4 text-2xl opacity-50">❄️</div>
          <div className="absolute bottom-4 right-6 text-xl opacity-50">❄️</div>
          <div className="absolute top-12 left-6 text-lg opacity-30">❄️</div>
        </div>
      </div>
    </div>
  );
}
