import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './ImpVideoShow.css';

const ImportantVideoGallery = ({ vidSrc }) => {
    const videos = vidSrc || [];
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <div className="w-full mx-auto">
      {/* Main Video Player */}
      <div className="aspect-w-full overflow-hidden shadow-lg videoratio mb-6">
        <ReactPlayer
          src={activeVideo.src}
          width="100%"
          height="100%"
          controls={true}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1, // removes YouTube logo
                rel: 0,            // no related videos
                showinfo: 0,       // hides video info
                iv_load_policy: 3, // hides annotations
              },
            },
          }}
        />
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {videos.map((video, index) => (
          <div
            key={index}
            onClick={() => setActiveVideo(video)}
            className={`min-w-[150px] cursor-pointer border rounded-lg overflow-hidden shadow-sm flex-shrink-0 transition-transform hover:scale-105 ${
              activeVideo.src === video.src ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <img
              src={video.thumbnail}
              alt={video.title || `Video ${index + 1}`}
              className="w-36 h-24"
            />
            <div className="p-2 text-sm text-center font-medium whitespace-nowrap">
              {video.title || `Video ${index + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportantVideoGallery;



// // import React from 'react';
// // import ReactPlayer from 'react-player';
// // import './ImpVideoShow.css';
// // // import { t } from 'i18next';

// // const ImportantVideo = ({ vidSrc }) => {
// //     return (
// //         <div className=" max-w-full  mx-auto">
// //             <div className="aspect-w-full overflow-hidden shadow-lg videoratio">
// //                 <ReactPlayer
// //                     src={vidSrc}
// //                     controls
// //                     width="100%"
// //                     height="100%"
// //                 />
// //             </div>
// //         </div>
// //     );
// // };

// // export default ImportantVideo;