"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalFrameProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  htmlContent: string;
  iframeClassName?: string;
  dialogClassName?: string;
}

export function ModalFrame({
  isOpen,
  onOpenChange,
  title,
  htmlContent,
  iframeClassName,
  dialogClassName,
}: ModalFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(600);

  useEffect(() => {
    if (isOpen && iframeRef.current) {
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
  }, [isOpen, htmlContent]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
}

export default ModalFrame;
