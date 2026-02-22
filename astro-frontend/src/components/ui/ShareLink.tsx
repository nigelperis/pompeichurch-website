import React from "react";
import ShareIcon from "~/assets/react-icons/share.svg?react";
import { cn } from "~/helpers/cn";

type ShareLinkProps = {
  className?: string;
  size?: number;
  shareData: {
    title?: string;
    text?: string;
    url?: string;
  };
};

const ShareLink: React.FC<ShareLinkProps> = ({
  className,
  shareData,
  size = 30,
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title || "Obituary",
          text: shareData.text || "",
          url:
            shareData.url ||
            (typeof window !== "undefined" ? window.location.href : ""),
        });
      } catch (error) {
        if (navigator.clipboard && typeof window !== "undefined") {
          navigator.clipboard
            .writeText(shareData.url || window.location.href)
            .then(() => {})
            .catch(() => {});
        } else {
          alert("Sharing not supported on this device.");
        }
      }
    } else {
      if (navigator.clipboard && typeof window !== "undefined") {
        navigator.clipboard
          .writeText(shareData.url || window.location.href)
          .then(() => {})
          .catch(() => {});
      } else {
        alert("Sharing not supported on this device.");
      }
    }
  };

  return (
    <button
      className={cn(
        "share-button cursor-pointer transform transition-transform duration-300 md:hover:scale-110",
        className,
      )}
      aria-label="Share this content"
      onClick={handleShare}
      type="button"
    >
      <ShareIcon width={size} height={size} className="text-slate-700" />
    </button>
  );
};

export default ShareLink;
