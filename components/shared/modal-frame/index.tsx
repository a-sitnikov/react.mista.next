"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IProps {
  title?: string;
  htmlContent: string;
  iframeClassName?: string;
  dialogClassName?: string;
}

export const ModalFrame: React.FC<IProps> = ({
  title,
  htmlContent,
  iframeClassName,
  dialogClassName,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(600);
  const [open, setOpen] = useState(true);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (open && iframeRef.current) {
      // Auto-adjust height based on content
      setTimeout(() => {
        try {
          const iframeDoc =
            iframeRef.current?.contentDocument ||
            iframeRef.current?.contentWindow?.document;
          if (iframeDoc) {
            const height = iframeDoc.documentElement.scrollHeight;
            setIframeHeight(Math.min(height, window.innerHeight * 0.8));
          }
        } catch (error) {
          console.warn(
            "Could not access iframe content for height adjustment",
            error,
          );
        }
      }, 100);
    }
  }, [open, htmlContent]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={dialogClassName}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="w-full overflow-auto">
          <iframe
            ref={iframeRef}
            title={title || "Content Frame"}
            className={iframeClassName}
            style={{
              width: "100%",
              height: `${iframeHeight}px`,
              border: "none",
              borderRadius: "0.375rem",
            }}
            sandbox="allow-same-origin allow-scripts allow-popups"
            srcDoc={htmlContent}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFrame;
