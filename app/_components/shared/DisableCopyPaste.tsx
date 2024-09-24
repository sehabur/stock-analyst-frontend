"use client";
import { useEffect } from "react";

export default function DisableCopyPaste() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISABLE_COPY != "false") {
      const disableCopyPaste = (e: { preventDefault: () => void }) => {
        e.preventDefault();
      };
      // const disableContextMenu = (e: { preventDefault: () => void }) => {
      //   e.preventDefault();
      // };

      document.addEventListener("copy", disableCopyPaste);
      document.addEventListener("cut", disableCopyPaste);
      document.addEventListener("paste", disableCopyPaste);
      // document.addEventListener("contextmenu", disableContextMenu);

      return () => {
        document.removeEventListener("copy", disableCopyPaste);
        document.removeEventListener("cut", disableCopyPaste);
        document.removeEventListener("paste", disableCopyPaste);
        // document.removeEventListener("contextmenu", disableContextMenu);
      };
    }
  }, []);

  return <></>;
}
