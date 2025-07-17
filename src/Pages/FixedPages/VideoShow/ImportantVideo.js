import React from 'react';
import ReactPlayer from 'react-player';
import './ImpVideoShow.css';
import { t } from 'i18next';

const ImportantVideo = ({ vidSrc }) => {
    return (
        <div className=" max-w-full  mx-auto">
            <div className="aspect-w-full overflow-hidden shadow-lg videoratio">
                <ReactPlayer
                    src={vidSrc}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default ImportantVideo;