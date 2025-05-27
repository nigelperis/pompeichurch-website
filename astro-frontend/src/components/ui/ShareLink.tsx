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
        await navigator.share(shareData);
      } catch (e) {}
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <button
      className={cn(
        "share-button cursor-pointer transform transition-transform duration-300 hover:scale-110",
        className,
      )}
      aria-label="Share this content"
      onClick={handleShare}
      type="button"
    >
      <ShareIcon width={size} height={size} className="text-slate-600" />
    </button>
  );
};

export default ShareLink;
