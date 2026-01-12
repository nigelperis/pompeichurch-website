export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (!videoId) return null;

      const start = parsed.searchParams.get("t");
      return start
        ? `https://www.youtube.com/embed/${videoId}?start=${start.replace(
            "s",
            "",
          )}`
        : `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  } catch {
    return null;
  }
}
