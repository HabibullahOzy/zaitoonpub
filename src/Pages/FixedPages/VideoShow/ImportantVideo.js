import React, { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import "./ImpVideoShow.css";

const ImportantVideo = ({ vidSrc }) => {
  /**
   * ✅ SAFELY normalize vidSrc into an array
   */
  const videos = useMemo(() => {
    if (Array.isArray(vidSrc)) return [...vidSrc].reverse();
    if (vidSrc && typeof vidSrc === "object") return [vidSrc];
    return [];
  }, [vidSrc]);

  /**
   * ✅ Active video state
   */
  const [activeVideo, setActiveVideo] = useState(null);

  /**
   * ✅ Set default active video when data arrives
   */
  useEffect(() => {
    if (videos.length > 0) {
      setActiveVideo(videos[0]);
    }
  }, [videos]);

  /**
   * ✅ Thumbnail generator
   */
  const getDefaultThumbnail = (video) => {
    if (video?.image) return video.image;

    if (
      video?.srce?.includes("youtube.com") ||
      video?.srce?.includes("youtu.be")
    ) {
      const match = video.srce.match(
        /(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      if (match?.[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
      }
    }

    return "/default-thumbnail.jpg";
  };

  /**
   * ✅ Empty state (NO CRASH)
   */
  if (!videos.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No videos available
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[50%] mx-auto px-3">
      {/* MAIN VIDEO */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-6">
        <ReactPlayer
          src={activeVideo?.srce}
          width="100%"
          height="100%"
          controls
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                iv_load_policy: 3,
              },
            },
          }}
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {videos.map((video, index) => {
          const thumbnail = getDefaultThumbnail(video);

          return (
            <button
              key={index}
              onClick={() => setActiveVideo(video)}
              className={`w-28 flex-shrink-0 rounded-lg overflow-hidden border transition
              hover:scale-105 ${
                activeVideo?.srce === video?.srce
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <img
                src={thumbnail}
                alt={video?.title || `Video ${index + 1}`}
                className="w-full h-20 object-cover"
              />
              <div className="p-1 text-xs text-center truncate font-medium">
                {video?.title || `Video ${index + 1}`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImportantVideo;
