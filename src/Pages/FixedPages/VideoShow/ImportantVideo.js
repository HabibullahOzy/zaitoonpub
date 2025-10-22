import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './ImpVideoShow.css';

const ImportantVideo = ({ vidSrc }) => {
  // Reverse to show latest/last added video first
  const videos = [...(vidSrc || [])].reverse();

  // Set default active video to the latest one
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  // Helper: generate default thumbnail (YouTube or video frame)
  const getDefaultThumbnail = (video) => {
    if (video?.image) return video.image;

    // Handle YouTube video link
    if (video?.srce?.includes('youtube.com') || video?.srce?.includes('youtu.be')) {
      const match = video.srce.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
      }
    }

    // Default fallback thumbnail
    return '/default-thumbnail.jpg';
  };

  useEffect(() => {
    if (videos.length > 0) setActiveVideo(videos[0]);
  }, [vidSrc]);

  return (
    <div className="lg:w-[50%] lg:h-[50%] mx-auto">
      {/* Main Video Player */}
      <div className=" overflow-hidden shadow-lg videoratio mb-6 rounded-2xl">
        <ReactPlayer
          src={activeVideo?.srce}
          width="100%"
          height="100%"
          controls={true}
          playing={false}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
              },
            },
          }}
        />
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar pl-2">
        {videos.map((video, index) => {
          const thumbnail = getDefaultThumbnail(video);
          return (
            <div
              key={index}
              onClick={() => setActiveVideo(video)}
              className={`max-w-28 cursor-pointer border rounded-lg overflow-hidden shadow-sm flex-shrink-0 transition-transform hover:scale-105 ${
                activeVideo?.srce === video?.srce ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img
                src={thumbnail}
                alt={video?.title || `Video ${index + 1}`}
                className=" object-cover"
              />
              <div className="p-2 text-xs text-center font-medium truncate">
                {video?.title || `Video ${index + 1}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImportantVideo;
