import type { BlocksContent } from "@strapi/blocks-react-renderer";

export const isPrayerEmpty = (prayer: BlocksContent | undefined) => {
  if (!prayer || prayer.length === 0) {
    return true;
  }

  if (Array.isArray(prayer)) {
    for (const block of prayer) {
      if (block.type === "paragraph" && block.children) {
        const hasText = block.children.some(
          (child) => child.type === "text" && child.text.trim() !== "",
        );
        if (hasText) {
          return false;
        }
      }
    }
  }
  return true;
};
