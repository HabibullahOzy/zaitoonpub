import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaCopy, FaRegCopy } from 'react-icons/fa6';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton
} from 'react-share';

import './ShareBookS.css';

const SharebookSocialModal = ({ Shdataes }) => {
  const [copied, setCopied] = useState(false);



  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = `${Shdataes?.namebn || Shdataes?.nameeng},category: ${Shdataes?.category}, author: ${Shdataes?.authorName}`;
  const description = Shdataes?.description || '';
  const image = Shdataes?.image || '';


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide after 2 sec
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <div className="modal-header text-black">
      {/* Meta tags for social previews */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="product" />

        {/* Twitter Tags */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>


      <h1 className="font-semibold">{Shdataes?.namebn}</h1>
      <p>{description}</p>
      {image && <img src={image} alt={Shdataes?.nameeng} style={{ maxWidth: '200px' }} />}

      {/* Social Share Buttons */}
       <div className="flex gap-3 items-center mt-4 flex-wrap">
      {/* Share Buttons */}
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <FacebookMessengerShareButton url={shareUrl} appId="YOUR_FB_APP_ID">
        <FacebookMessengerIcon size={40} round />
      </FacebookMessengerShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>

      <TelegramShareButton url={shareUrl} title={title}>
        <TelegramIcon size={40} round />
      </TelegramShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={title}
        summary={description}
        source={shareUrl}
      >
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className={`flex items-center justify-center w-10 h-10 mt-1 text-white rounded-full transition-all duration-300 ${
          copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
        title="Copy Link"
      >
        {copied ? (
          <FaCheck className="text-lg animate-scale-in" />
        ) : (
          <FaRegCopy className="text-lg animate-fade-in" />
        )}
      </button>
    </div>
    </div>
  );
};

export default SharebookSocialModal;