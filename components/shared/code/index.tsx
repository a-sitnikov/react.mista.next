import { useMemo, useState } from "react";
import { highlight } from "./code_highlight";
import { childrenToText } from "@/lib/utils";

const trimNewLines = (str: string) => {
  let start = 0;
  let end = str.length;

  // Remove leading newlines
  while (start < end && (str[start] === "\n" || str[start] === "\r")) {
    start++;
  }

  // Remove trailing newlines
  while (end > start && (str[end - 1] === "\n" || str[end - 1] === "\r")) {
    end--;
  }

  return str.substring(start, end);
};

const prepareText = (text: string): string => {
  // replace double new-lines
  let newtext = text
    .replace(/\n<br>/g, "\n")
    .replace(/<br>\n/g, "\n")
    .replace(/\r<br>/g, "\n")
    .replace(/<br>\r/g, "\n")
    .replace(/<br>/g, "\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt");

  newtext = trimNewLines(newtext);
  return highlight(newtext);
};

export const Code: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [hidden, setHidden] = useState(true);

  const [text, linesCount] = useMemo(() => {
    if (!children) return ["", 0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let _text = childrenToText(children as any).join("");
    _text = prepareText(_text);

    return [_text, _text.split("\n").length];
  }, [children]);

  const onShowClick = () => {
    setHidden((prev) => !prev);
  };

  const preStyle: React.CSSProperties = {};

  if (hidden && linesCount > 7) {
    preStyle.overflow = "hidden";
    preStyle.height = "135px";
  } else {
    preStyle.overflow = "auto";
    preStyle.height = "auto";
  }

  return (
    <div className="mt-[5px]">
      <pre
        className="code-pre"
        style={preStyle}
        dangerouslySetInnerHTML={{ __html: text }}
      ></pre>
      {linesCount > 7 && (
        <div className="text-left font-[courier_new,courier] text-blue-500 my-[5px] mx-auto border border-dashed border-[#ddd] pb-[10px] w-full overflow-x-auto [scrollbar-color:#adb3be_transparent] [scrollbar-width:thin] [tab-size:4] ">
          <span className="expand-button-span" onClick={onShowClick}>
            {hidden ? `Показать: ${linesCount} строк` : "Скрыть"}
          </span>
        </div>
      )}
    </div>
  );
};
