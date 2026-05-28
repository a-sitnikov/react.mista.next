import { DOMAIN } from "@/app/api/constants";
import React from "react";
import { PhotoView } from "react-photo-view";

interface IProps
  extends React.ImgHTMLAttributes<HTMLImageElement>, React.PropsWithChildren {
  src?: string;
  fullSrc?: string;
}

export const PreviewImage: React.FC<IProps> = ({ src, fullSrc, alt }) => {
  const srcWithDomain = (() => {
    if (typeof src === "string" && src?.startsWith("/")) {
      return `${DOMAIN}/${src}`;
    } else {
      return src;
    }
  })();

  const fullSrcWithDomain = (() => {
    const res = fullSrc ? fullSrc : src;

    if (typeof res === "string" && res?.startsWith("/")) {
      return `${DOMAIN}/${res}`;
    } else {
      return res;
    }
  })();

  return (
    <PhotoView src={fullSrcWithDomain}>
      <img
        className="max-w-full max-h-96 cursor-pointer"
        alt={alt}
        src={srcWithDomain}
      />
    </PhotoView>
  );
};
