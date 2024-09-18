"use client";
import { useEffect } from "react";

export default function DisableCopyPaste() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISABLE_COPY != "false") {
      const disableCopyPaste = (e: { preventDefault: () => void }) => {
        e.preventDefault();
      };

      const disableContextMenu = (e: { preventDefault: () => void }) => {
        e.preventDefault();
      };

      // Disable copy, cut, paste events
      document.addEventListener("copy", disableCopyPaste);
      document.addEventListener("cut", disableCopyPaste);
      document.addEventListener("paste", disableCopyPaste);

      // Disable right-click context menu
      document.addEventListener("contextmenu", disableContextMenu);

      return () => {
        document.removeEventListener("copy", disableCopyPaste);
        document.removeEventListener("cut", disableCopyPaste);
        document.removeEventListener("paste", disableCopyPaste);
        document.removeEventListener("contextmenu", disableContextMenu);
      };
    }
  }, []);

  return <></>;
}
